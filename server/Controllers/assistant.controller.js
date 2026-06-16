import { generateGeminiResponse } from "../Config/gemini.js";
import User from "../Models/user.model.js";

export const getAssistantConfig = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-geminiAPIKey");
    if (!user) {
      return res.status(404).json({ message: "Failed to get user" });
    }

    return res.status(200).json({ message: "Assistant config data", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Assistant config error: ${error.message}` });
  }
};

export const askAssistant = async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res
        .status(400)
        .json({ message: "Message and UserId are required" });
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.geminiAPIKey) {
      return res.status(404).json({ message: "Gemini API key is required" });
    }

    if (user.plan === "free" && user.totalMessages >= user.requestLimit) {
      return res.status(400).json({ message: "Free limit reached" });
    }

    if (user.plan === "pro" && new Date(user.proExpiry) < new Date()) {
      user.plan === "free";
      await user.save();
      return res.status(400).json({ message: "Pro plan expired" });
    }
    const cleanMessage = message.toLowerCase();
    if (user.enableNavigation) {
      //navigation commands
      const navigationWords = [
        "open",
        "go",
        "start",
        "show",
        "navigate",
        "take me",
      ];

      //   check navigation intent
      const wantsNavigation = navigationWords.some((word) =>
        cleanMessage.startsWith(word),
      );

      //   user wants navitgation
      if (wantsNavigation) {
        // find matching page
        const matchedPage = user.pages.find((page) =>
          page.keywords.some((keyword) =>
            cleanMessage.includes(keyword.toLowerCase()),
          ),
        );

        // page found
        if(matchedPage){
            // already open 
            if(req.body.currentPath === matchedPage.path){
                return res.json({success : true , 
                    response : `${matchedPage.name} already open `
                })
            }

            //navigate 
            return res.json({
                success :true,
                action : "navigate",
                path : matchedPage.path,

                response: `Opening ${matchedPage.name}`
            })
        }
      }
    }

    const prompt = `
    You are ${user.assistantName}. 
    Business Name : ${user.businessName}
    Business Type : ${user.businessType}
    Business Description ${user.businessDescription}
    Assistant Tone : ${user.tone}

    Rules :- 
    -Keep replies under 15-20 words 
    -Give fast direct respones 
    -Talk naturally
    -Behave like a smart voice assistant 
    -Avoid long explanations
    -Keep responses short for quick voice playback

    User Question : ${message}
    `;

    const aiResponse = await generateGeminiResponse({prompt , apikey : user.geminiAPIKey , user})

    if(user.plan === "free"){

        user.totalMessages += 1
        await user.save()
    }

    return res.json({
        success : true,
        response : aiResponse,  
    })




  } catch (error) {
    console.log(error)
    return res.status(500).json({
        success : false , 
        message : "Assistant AI Error"
    })
  }
};
