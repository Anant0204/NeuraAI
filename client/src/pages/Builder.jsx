import { useState } from "react";
import { TiPlus } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { CLIENT_URL, serverURL } from "../App";
import { FaRegCopy } from "react-icons/fa6";


const themes = ["dark", "ocean", "neon", "midnight", "emerald", "glass"];

const tones = ["Formal", "Friendly", "Professional", "Casual"];

function Builder({ user, setUser }) {

const [editAssistant , setEditAssistant] = useState(!user?.isSetupComplete);

  const [assistantName, setAssistantName] = useState(user?.assistantName || "");
  const [businessName, setBusinessName] = useState(user?.businessName || "");
  const [businessType, setBusinessType] = useState(user?.businessType || "");
  const [businessDescription, setBusinessDescription] = useState(
    user?.businessDescription || "",
  );
  const [theme, setTheme] = useState(user?.theme || "dark");
  const [tone, setTone] = useState(user?.tone || "Formal");
  const [geminiAPIKey, setGeminiAPIKey] = useState(user?.geminiAPIKey || "");
  const [pages, setPages] = useState(user?.pages || []);
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [pageKeywords, setPageKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const addPage = () => {
    if (!pageName || !pagePath) {
      alert("Please enter page name and path");
      return;
    }
    const newPage = {
      name: pageName,
      path: pagePath,
      keywords: pageKeywords.split(",").map((item) => item.trim()),
    }
    setPages([...pages, newPage]);
    setPageName("");
    setPagePath("");
    setPageKeywords("");
  };

  const removePage = (index) => {
    const updatedPages = pages.filter((_, i) => i !== index);
    setPages(updatedPages);
  }


  const saveAssistant = async () => {
    setLoading(true);
    try{
      const data ={
        assistantName,
        businessName,
        businessType,
        businessDescription,
        theme,
        tone,
        geminiAPIKey,
        pages
      }

      const res = await axios.post(serverURL + "/api/user/save-assistant" , data, {withCredentials: true});
     
      setUser(res.data.user);
      setEditAssistant(false);
      toast.success("Assistant saved successfully")
      setLoading(false);

    }catch(error){
      toast.error("Failed to save assistant");
      console.log("saving assistant error" , error)
      setLoading(false);
    }
  }


  const remainingMessages = Math.max( 0 , (user?.requestLimit || 0)) - (user?.totalMessages || 0);

  const remainingDays = user?.proExpiry ? Math.ceil((new Date(user.proExpiry) - new Date()) / (1000 * 60 * 60 * 24)) : 0;


  const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user._id}"></script>`;
  return (
  
    <div className="min-h-screen bg-amber-50/20 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className=" mb-8">
          <h2 className="text-3xl font-bold text-black">Assistant Builder</h2>
          <p className="text-gray-500 mt-1">Customize your virtual assistant</p>
        </div>


        {user.isSetupComplete && !editAssistant && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
          <p className="text-sm text-gray-400">Assistant</p>
          
          <h2 className="text-3xl font-bold text-black mt-1">{user?.assistantName}</h2>
          <p className="text-gray-500 mt-3 leading-7">Your assistant is ready to use on website.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-2xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500 ">Current Plan</p>
              <h2 className="text-xl font-bold text-black mt-1 capitalize">{user?.plan}</h2>
            </div>

            <div className="rounded-2xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500 "> Gemini Status</p>
              <h2 className={`text-xl font-bold mt-1 capitalize ${user?.geminiStatus === "active" ? "text-green-500" : user?.geminiStatus === "invalid" ? "text-red-500" : "text-gray-500"}`}>{user?.geminiStatus}</h2>
            </div>

            <div className="rounded-2xl border border-gray-100 p-4">
              <p className="text-sm text-gray-500 ">{user?.plan === "free" ? "Messages Left" : "Plan Expiry"}</p>
              <h2 className="text-xl font-bold text-black mt-1 capitalize">{user?.plan === "free" ? remainingMessages : `${remainingDays} Days`}</h2>
            </div>
          </div>

          <div className="mt-7">
            <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4">
              <p className="text-sm font-semibold text-amber-900 ">Where to paste this script?</p>
              <p className="text-sm text-amber-500 mt-2 leading-6">
                Paste this script before the closing
                {" "}
                <span className="font-semibold">
                  {"</body>"}
                </span> 
                {" "}
                tag of your website HTML file.
                <br/>
                <br/>
                Example:
              </p>

              <pre className="mt-3 bg-black text-cyan-500 rounded-xl p-3 text-xs font-mono overflow-x-auto">
                {`<body>
                    Your website content...

                  <script src="${CLIENT_URL}/assistant.js" data-user-id="${user._id}"></script>
                  </body>`}
              </pre>
            </div>

            <p className="text-sm font-medium text-gray-900 mb-3 mt-4">Embed Code</p>
          </div>

          <div className="relative">
            <textarea value={embedCode} readOnly  className="w-full h-20 bg-gray-700 text-cyan-400 rounded-2xl p-4 text-sm font-mono resize-none outline-none"/>
            <button
            onClick={()=>{
              navigator.clipboard.writeText(embedCode);
              toast.success("Copied...")
            }}
             className="cursor-pointer absolute top-4 right-4 w-10 h-10 rounded-xl bg-white flex items-center justify-center"><FaRegCopy />
</button>
          </div>

          <button
          onClick={()=> setEditAssistant(true)}
           className="mt-6 h-12 px-6 rounded-2xl bg-gradient-to-r from-purple-400 to-cyan-400 text-white font-medium">Edit Assistant</button>

          </div>
        )}

        {editAssistant && <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-50 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-5 ">Basic Information</h2>

            <div className="space-y-4">
              <input
                onChange={(e) => setAssistantName(e.target.value)}
                value={assistantName}
                type="text"
                placeholder="Assistant Name"
                className="border  border-gray-200 w-full p-2 rounded-2xl"
              />
              <input
                onChange={(e) => setBusinessName(e.target.value)}
                value={businessName}
                type="text"
                placeholder="Business Name"
                className="border  border-gray-200 w-full p-2 rounded-2xl"
              />
              <input
                onChange={(e) => setBusinessType(e.target.value)}
                value={businessType}
                type="text"
                placeholder="Business Type"
                className="border  border-gray-200 w-full p-2 rounded-2xl"
              />
              <textarea
                rows={4}
                onChange={(e) => setBusinessDescription(e.target.value)}
                value={businessDescription}
                placeholder="Business Description"
                className="resize-none border  border-gray-200 w-full p-2 rounded-2xl"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-50 shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-5 ">Apperance</h2>
            <div>
              <label className="text-sm text-gray-600 mb-3 block">Theme</label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {themes.map((item) => (
                  <button
                    onClick={() => setTheme(item)}
                    key={item}
                    className={`py-3 rounded-2xl border-2 capitalize ${theme === item ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200 "}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-600 mb-3 block">
                Assistant Tone
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                {tones.map((item) => (
                  <button
                    onClick={() => setTone(item)}
                    key={item}
                    className={`py-3 rounded-2xl border-2 capitalize ${tone === item ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-200 "}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold">Gemini API Key</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Add your Gemini API key to power your assistant.
                </p>
              </div>

              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-600 to-cyan-400 text-white px-4 py-2 rounded-2xl font-bold text-medium"
              >
                Get API Key
              </a>
            </div>

            <input
              type="password"
              placeholder="xOPr...."
              onChange={(e) => setGeminiAPIKey(e.target.value)}
              value={geminiAPIKey}
              className="w-full border border-gray-300 rounded-2xl px-4 py-3"
            />

            <p className="text-xs text-gray-400 mt-3 leading-6">Your API key is stored securely and never shared with anyone.</p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 ">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold">
                  Navigation Pages 
                </h2>
                <p className="text-sm text-gray-400">Assistant can redirect users</p>
              </div>
              <button 
              onClick={addPage}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-sm">
                <TiPlus/>Add
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input type="text" placeholder="Page Name" className="border border-gray-300 rounded-2xl px-4 py-3" 
                onChange={(e) => setPageName(e.target.value)}
                value={pageName}
              />
              <input type="text" placeholder="/about" className="border border-gray-300 rounded-2xl px-4 py-3" 
                onChange={(e) => setPagePath(e.target.value)}
                value={pagePath}
              />
              <input type="text" placeholder="About , Contact" className="border border-gray-300 rounded-2xl px-4 py-3" 
                onChange={(e) => setPageKeywords(e.target.value)}
                value={pageKeywords}
              />
            </div>

            <div className="mt-5 space-y-3">
              {
                pages.map((item, index) => (
                  <div key={index} className="flex items-center justify-between border border-gray-200 rounded-2xl p-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.path}</p>
                  </div>
                  <button 
                  onClick={() => removePage(index)}
                  className="text-red-500">
<MdDelete size={20} />


                  </button>
                    
                  </div>
                ))
              }
            </div>
          </div>

          <button
          onClick={saveAssistant}
          disabled={loading}
           className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-bold">
            {loading ? "Saving..." : user.isSetupComplete ? "Update Assistant" : "Save Assistant"}
          </button>
        </div>}
      </div>
    </div>
  );
}

export default Builder;
