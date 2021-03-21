using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Quiz.Webpack
{
    public static class WebpackChunkNamer
    {
        private static Dictionary<string, string> JsTags { get; } = new();
        private static Dictionary<string, string> CssTags { get; } = new();

        public static void Init()
        {
            using FileStream fs = File.OpenRead("Webpack/stats.json");
            using StreamReader sr = new StreamReader(fs);
            using JsonTextReader reader = new JsonTextReader(sr);
            JObject obj = JObject.Load(reader);

            foreach (JProperty prop in obj["assetsByChunkName"].Cast<JProperty>())
            {
                if (prop.Value.Count() > 1)
                {
                    foreach (JToken item in prop.Value)
                    {
                        if (item.ToString().Contains(".js"))
                            JsTags.Add(prop.Name, item.ToString());
                        else
                            CssTags.Add(prop.Name, item.ToString());
                    }
                }
                else if (prop.Value.ToString().Contains(".js"))
                {
                    JsTags.Add(prop.Name, prop.Value[0].ToString());
                }
                else
                {
                    CssTags.Add(prop.Name, prop.Value[0].ToString());
                }
            }
        }

        public static string GetJsFile(string filename) => JsTags[filename];

        public static string GetCssFile(string filename) => CssTags[filename];
    }
}
