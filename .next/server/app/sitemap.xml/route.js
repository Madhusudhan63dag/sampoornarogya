(()=>{var e={};e.id=475,e.ids=[475],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},2127:(e,i,t)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),!function(e,i){for(var t in i)Object.defineProperty(e,t,{enumerable:!0,get:i[t]})}(i,{resolveManifest:function(){return n},resolveRobots:function(){return o},resolveRouteData:function(){return s},resolveSitemap:function(){return r}});let a=t(7341);function o(e){let i="";for(let t of Array.isArray(e.rules)?e.rules:[e.rules]){for(let e of(0,a.resolveArray)(t.userAgent||["*"]))i+=`User-Agent: ${e}
`;if(t.allow)for(let e of(0,a.resolveArray)(t.allow))i+=`Allow: ${e}
`;if(t.disallow)for(let e of(0,a.resolveArray)(t.disallow))i+=`Disallow: ${e}
`;t.crawlDelay&&(i+=`Crawl-delay: ${t.crawlDelay}
`),i+="\n"}return e.host&&(i+=`Host: ${e.host}
`),e.sitemap&&(0,a.resolveArray)(e.sitemap).forEach(e=>{i+=`Sitemap: ${e}
`}),i}function r(e){let i=e.some(e=>Object.keys(e.alternates??{}).length>0),t=e.some(e=>{var i;return!!(null==(i=e.images)?void 0:i.length)}),a=e.some(e=>{var i;return!!(null==(i=e.videos)?void 0:i.length)}),o="";for(let l of(o+='<?xml version="1.0" encoding="UTF-8"?>\n',o+='<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',t&&(o+=' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'),a&&(o+=' xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"'),i?o+=' xmlns:xhtml="http://www.w3.org/1999/xhtml">\n':o+=">\n",e)){var r,n,s;o+="<url>\n",o+=`<loc>${l.url}</loc>
`;let e=null==(r=l.alternates)?void 0:r.languages;if(e&&Object.keys(e).length)for(let i in e)o+=`<xhtml:link rel="alternate" hreflang="${i}" href="${e[i]}" />
`;if(null==(n=l.images)?void 0:n.length)for(let e of l.images)o+=`<image:image>
<image:loc>${e}</image:loc>
</image:image>
`;if(null==(s=l.videos)?void 0:s.length)for(let e of l.videos)o+=["<video:video>",`<video:title>${e.title}</video:title>`,`<video:thumbnail_loc>${e.thumbnail_loc}</video:thumbnail_loc>`,`<video:description>${e.description}</video:description>`,e.content_loc&&`<video:content_loc>${e.content_loc}</video:content_loc>`,e.player_loc&&`<video:player_loc>${e.player_loc}</video:player_loc>`,e.duration&&`<video:duration>${e.duration}</video:duration>`,e.view_count&&`<video:view_count>${e.view_count}</video:view_count>`,e.tag&&`<video:tag>${e.tag}</video:tag>`,e.rating&&`<video:rating>${e.rating}</video:rating>`,e.expiration_date&&`<video:expiration_date>${e.expiration_date}</video:expiration_date>`,e.publication_date&&`<video:publication_date>${e.publication_date}</video:publication_date>`,e.family_friendly&&`<video:family_friendly>${e.family_friendly}</video:family_friendly>`,e.requires_subscription&&`<video:requires_subscription>${e.requires_subscription}</video:requires_subscription>`,e.live&&`<video:live>${e.live}</video:live>`,e.restriction&&`<video:restriction relationship="${e.restriction.relationship}">${e.restriction.content}</video:restriction>`,e.platform&&`<video:platform relationship="${e.platform.relationship}">${e.platform.content}</video:platform>`,e.uploader&&`<video:uploader${e.uploader.info&&` info="${e.uploader.info}"`}>${e.uploader.content}</video:uploader>`,`</video:video>
`].filter(Boolean).join("\n");if(l.lastModified){let e=l.lastModified instanceof Date?l.lastModified.toISOString():l.lastModified;o+=`<lastmod>${e}</lastmod>
`}l.changeFrequency&&(o+=`<changefreq>${l.changeFrequency}</changefreq>
`),"number"==typeof l.priority&&(o+=`<priority>${l.priority}</priority>
`),o+="</url>\n"}return o+"</urlset>\n"}function n(e){return JSON.stringify(e)}function s(e,i){return"robots"===i?o(e):"sitemap"===i?r(e):"manifest"===i?n(e):""}},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3271:(e,i,t)=>{"use strict";t.r(i),t.d(i,{patchFetch:()=>v,routeModule:()=>g,serverHooks:()=>f,workAsyncStorage:()=>m,workUnitAsyncStorage:()=>y});var a={};t.r(a),t.d(a,{default:()=>u});var o={};t.r(o),t.d(o,{GET:()=>p});var r=t(6559),n=t(8088),s=t(7719),l=t(2190),d=t(9386);function u(){let e="https://sampoornarogya.com";return[{url:e,lastModified:new Date,changeFrequency:"daily",priority:1},{url:`${e}/about`,lastModified:new Date,changeFrequency:"weekly",priority:.8},{url:`${e}/product`,lastModified:new Date,changeFrequency:"weekly",priority:.9},{url:`${e}/sampurna`,lastModified:new Date,changeFrequency:"weekly",priority:.7},{url:`${e}/contact`,lastModified:new Date,changeFrequency:"monthly",priority:.8},{url:`${e}/blog`,lastModified:new Date,changeFrequency:"weekly",priority:.8},{url:`${e}/sitemap`,lastModified:new Date,changeFrequency:"monthly",priority:.5},{url:`${e}/private`,lastModified:new Date,changeFrequency:"yearly",priority:.3},{url:`${e}/term`,lastModified:new Date,changeFrequency:"yearly",priority:.3},{url:`${e}/shipping`,lastModified:new Date,changeFrequency:"yearly",priority:.3},{url:`${e}/cancel`,lastModified:new Date,changeFrequency:"yearly",priority:.3},{url:`${e}/return`,lastModified:new Date,changeFrequency:"yearly",priority:.3},{url:`${e}/thank-you`,lastModified:new Date,changeFrequency:"monthly",priority:.2},...d.A5.map(i=>({url:`${e}/blog/${i.slug}`,lastModified:new Date(i.date),changeFrequency:"monthly",priority:.6}))]}var c=t(2127);let h={...a}.default;if("function"!=typeof h)throw Error('Default export is missing in "D:\\ISN\\sampoornarogya\\app\\sitemap.ts"');async function p(e,i){let{__metadata_id__:t,...a}=await i.params||{},o=!!t&&t.endsWith(".xml");if(t&&!o)return new l.NextResponse("Not Found",{status:404});let r=t&&o?t.slice(0,-4):void 0,n=await h({id:r}),s=(0,c.resolveRouteData)(n,"sitemap");return new l.NextResponse(s,{headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=0, must-revalidate"}})}let g=new r.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/sitemap.xml/route",pathname:"/sitemap.xml",filename:"sitemap",bundlePath:"app/sitemap.xml/route"},resolvedPagePath:"next-metadata-route-loader?filePath=D%3A%5CISN%5Csampoornarogya%5Capp%5Csitemap.ts&isDynamicRouteExtension=1!?__next_metadata_route__",nextConfigOutput:"export",userland:o}),{workAsyncStorage:m,workUnitAsyncStorage:y,serverHooks:f}=g;function v(){return(0,s.patchFetch)({workAsyncStorage:m,workUnitAsyncStorage:y})}},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4072:(e,i,t)=>{"use strict";t.r(i),t.d(i,{default:()=>a});let a={src:"/_next/static/media/blog1.7939a862.webp",height:1080,width:1080,blurDataURL:"data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoIAAgAAkA4JZgCdAEPAmQmtoAA/vkGpNPryRiQfhA4rbkadBikzAgS2hwgDgGWq/hukpIgz/PalMIJ0+VmZ3LRbSIIAAAA",blurWidth:8,blurHeight:8}},4133:(e,i,t)=>{"use strict";t.r(i),t.d(i,{default:()=>a});let a={src:"/_next/static/media/blog2.2f8c6f38.webp",height:1080,width:1080,blurDataURL:"data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAwAgCdASoIAAgAAkA4JZgCdH8AGZMGDyaQAAD++0Deizmbh0kb3zqIFiHSveE3hOtLT7aYRDZWhBNmTMvRdUpAu8HmiIInkEeQAAAA",blurWidth:8,blurHeight:8}},4870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6487:()=>{},7341:(e,i)=>{"use strict";function t(e){return Array.isArray(e)?e:[e]}function a(e){if(null!=e)return t(e)}function o(e){let i;if("string"==typeof e)try{i=(e=new URL(e)).origin}catch{}return i}Object.defineProperty(i,"__esModule",{value:!0}),!function(e,i){for(var t in i)Object.defineProperty(e,t,{enumerable:!0,get:i[t]})}(i,{getOrigin:function(){return o},resolveArray:function(){return t},resolveAsArrayOrUndefined:function(){return a}})},8335:()=>{},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9386:(e,i,t)=>{"use strict";t.d(i,{A5:()=>r,WT:()=>n});var a=t(4072),o=t(4133);let r=[{id:1,slug:"Ayurvedic-Herbs-Digestion-Immunity",title:"Top Ayurvedic Herbs for Digestion and Immunity",excerpt:"Ayurvedic herbs for digestion & immunity that support natural healing, improve gut health, and strengthen immune function—backed by tradition.",content:`
      <h1>Herbs That Heal: Top Ayurvedic Herbs for Digestion & Immunity</h1>
      
      <p>Ayurveda, India's traditional health care system, has relied on herbs only since the initial thousands of years ago. Renowned for overall wellness, <a href="https://sampoornarogya.com/">Ayurvedic herbs</a> are particularly prized for immunity development and digestive health — both dimensions of overall wellness. The following discussion is regarding some of the most excellent Ayurvedic herbs helpful for immunity and digestive health too.</p>

      <h2>Top Ayurvedic Herbs for Immunity and Digestive Health Improvements</h2>

      <h3>1. Ashwagandha</h3>
      <p>Ashwagandha is a general strong adaptogen that calms the body in states of stress, otherwise it would be at the cost of immunity. Ashwagandha is also beneficial for digestion as it calms the nervous system and allows for improved nutrient absorption.</p>
      <ul>
        <li>Immunize the response</li>
        <li>Smooths cortisol and stress</li>
        <li>Delivers energy and stamina</li>
      </ul>

      <h3>2. Tulsi</h3>
      <p>Tulsi may also be called the "Queen of Herbs" because it has many <a href="https://www.medicalpropertiestrust.com/" target="_blank" rel="noopener">medicinal properties</a>. Drinking Tulsi tea daily will build immunity and soothe the digestive system.</p>
      <ul>
        <li>Natural immunity booster</li>
        <li>Antiviral and antibacterial action</li>
        <li>Prevents the occurrence of respiratory and gastrointestinal diseases</li>
      </ul>

      <h3>3. Turmeric</h3>
      <p>Turmeric has curcumin as its bioactive compound that cleans the intestinal tract, protects against infection, and inhibits inflammation in the body. With the intake of black pepper, it is maximized since it is an absorber enhancer.</p>
      <ul>
        <li>Antioxidant and anti-inflammatory</li>
        <li>Prevents liver and digestive system diseases</li>
        <li>Immune system stimulator</li>
      </ul>

      <h3>4. Triphala</h3>
      <p>Triphala is an extract of three fruits, which together interact synergistically to cleanse the digestive tract, maintain normal bowels, and optimize absorption of nutrients to peak levels — indirectly boosting immunity.</p>
      <ul>
        <li>Mild colon cleanser</li>
        <li>Regulates all three doshas</li>
        <li>Supports digestion and elimination</li>
      </ul>

      <h3>5. Ginger</h3>
      <p>Ginger is also widely used in food medicine to irritate digestive fire, calm gas, and combat cold and flu. The ginger tea is especially calming to the stomach.</p>
      <ul>
        <li>Ignite digestive fire</li>
        <li>Eases nausea and bloating</li>
        <li>Supports immune and respiratory health</li>
      </ul>

      <h3>6. Amla</h3>
      <p>Amla is a superfruit which is much revered in Ayurveda since it is a rejuvenating fruit by nature. It nourishes the body tissues nutritionally, activates immunity, and supports protein digestion.</p>
      <ul>
        <li>Spreads immunity</li>
        <li>Boosts metabolism and cleanses</li>
      </ul>

      <h3>7. Licorice Root</h3>
      <p>Licorice root is traditionally used to treat ulcers and inflammation of the gastrointestinal system for centuries. It serves to support healthy immune function by controlling cortisol levels.</p>
      <ul>
        <li>Soothes gut inflammation</li>
        <li>Sustains adrenal health and immunity</li>
      </ul>

      <h2>How to Use these Herbs</h2>
      <p>You can incorporate these herbs into your life as:</p>
      <ul>
        <li>Teas or decoctions</li>
        <li>Capsules or powder</li>
        <li>Pure tinctures or extracts</li>
        <li>Cooking spices</li>
      </ul>
      
      <p><strong>Tip:</strong> Always approach a doctor or Ayurvedic doctor prior to herbal treatment, if already on medicine or chronic illness.</p>

      <h2>Conclusion</h2>
      <p>Sampoorna Arogya is not just diseaseless ness — it's a state of living balance that mends the body, soothes the mind, and revives the spirit. Adopting Ayurvedic herbs for Digestion and Immunity helps to balance in food, uncomplicated exercise, mental balance, and processes of natural healing, we learn to live life with all its vibrancy and peace. Whether you start the journey to well-being or enhance a current regimen, understand that the aggregate of little steps each day towards greater well-being totals long-term wellness. Invest in yourself now — because true wealth starts with Sampoorna Arogya.</p>
      
      <p style="text-align: center; font-style: italic; margin-top: 30px;"><strong>Sampoorna Arogya – Wellness in Every Breath</strong></p>
    `,image:a.default,author:"Dr. Ayurveda Specialist",date:"June 15, 2025",readTime:"6 min read",category:"Science",featured:!0},{id:2,slug:"Digestive-health-detoxification",title:"Ayurvedic Guide to Better Digestive Health & Detoxification",excerpt:"Ayurveda boosts digestive health and detoxification using herbs, diet, and rituals that ignite Agni and clear toxins for Active and energetic.",content:`
      <h1>How Ayurvedic Medicine Helps Digestive Health & Detoxification</h1>
      
      <p>Ayurveda, the traditional Indian medical system, hinges on the close relationship between digestion, overall wellness, and detox capacity of the body. Ayurvedic wellness is defined by proper <a href="https://sampoornarogya.com/">Digestive Health and detoxification</a> is responsible for regained vigor.</p>

      <p>In this blog here, we explain to you how Ayurvedic medicine promotes a healthy digestive system and facilitates smooth but efficient detox.</p>

      <h2>The Ayurvedic Approach to Digestion</h2>
      <p>Agni, the "digestive fire," governs Ayurvedic digestion. Well-balanced Agni will produce food digestion, nutrient absorption, and less Ama. Unstable or irregular Agni will produce indigestion, bloating, heaviness, and Ama build-up, which is theorized to be the causative agent for almost all chronic disease.</p>
      
      <p><strong>Key Ayurvedic terms of digestion:</strong></p>
      <ul>
        <li><strong>Agni:</strong> Metabolic fire that breaks down food and transforms it.</li>
        <li><strong>Ama:</strong> Toxin buildup of poor digestion.</li>
        <li><strong>Doshas:</strong> The three humors of biological origin—Vata, Pitta, and Kapha—relating to digestive activity.</li>
      </ul>

      <h2>Ayurvedic Herbs for Digestion</h2>
      <p>Ayurvedic treatment employs a variety of <a href="https://sampoornarogya.com/product/">herbs for digestive health</a> detoxification, and cleansing of the body. Some of the most widely used are provided below:</p>

      <h3>1. Triphala</h3>
      <p>A blend of three fruits (Amalaki, Bibhitaki, Haritaki), Triphala takes charge of the bowel, cleanses the colon, and allows improved assimilation of nutrients.</p>

      <h3>2. Ginger</h3>
      <p>Ginger activates Agni, relieves bloating, and calms nausea. The perfect medicine for slow or delayed digestion.</p>

      <h3>3. Saunf</h3>
      <p>Chewing fennel seeds after food daily kills gas and aids in nutrient absorption.</p>

      <h3>4. CCF Tea (Cumin, Coriander, and Fennel)</h3>
      <p>Mild Ayurvedic digestive tea debloats and detoxifies the digestive system gently of toxins.</p>

      <h2>Ayurvedic Cleansing</h2>
      <p>Unlike aggressive detoxification, Ayurveda stimulates gentle daily cleansing mechanisms in synchronization with your own cycles.</p>

      <h3>Ayurvedic Detox Tips: Daily</h3>
      <ul>
        <li><strong>Warm Lemon Water:</strong> Assists in digestion and smooth elimination of toxins.</li>
        <li><strong>Tongue Scraping:</strong> Removes Ama waste from the tongue every day.</li>
        <li><strong>Oil Pulling:</strong> Mouth cleaning and mouth hygiene.</li>
        <li><strong>Dry Brushing & Abhyanga (Self-Oil Massage):</strong> Stimulation of lymphatic drainage and skin shedding.</li>
      </ul>

      <h3>Seasonal Cleansing</h3>
      <p>Facilitates seasonal toxin elimination. Ayurveda recommends complete meal detoxification in the season, i.e., spring and autumn. The <a href="https://ayurveda.com/introduction-to-panchakarma/" target="_blank" rel="noopener">Panchakarma purification therapy</a> is given traditionally under the supervision of an Ayurvedic doctor.</p>

      <h2>Ayurvedic Diet for Healthy Digestion</h2>
      <p>Ayurveda recommends healthy eating and dieting based on the season as per your Dosha. The recommendations are as follows:</p>
      <ul>
        <li>Consume freshly cooked food of natural whole foods.</li>
        <li>Don't take cold or processed food that poisons Agni.</li>
        <li>Chew easily and take food leisurely.</li>
        <li>Space food 3–4 hours for complete digestion.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Ayurvedic medicine is an ancient, holistic method of utilizing digestive function and natural purification to the best advantage. As far as your digestive fire (Agni) is concerned, eating medicinal herbs, and basically one-ifying yourself with the food, you will have greater energy, radiant complexion, and a robust immune system.</p>
      
      <p>If you are new to Ayurveda, start slowly—drink hot water during the day, take some <a href="https://sampoornarogya.com/product/">soothing digestion herbs</a>, and attend to your body. If you are experiencing severe detox or chronic gastrointestinal problems, find a qualified practitioner of Ayurveda.</p>
      
      <p style="text-align: center; font-style: italic; margin-top: 30px;"><strong>"Strong Digestion, Stronger You."</strong></p>
    `,image:o.default,author:"Wellness Expert",date:"July 1, 2025",readTime:"5 min read",category:"Health Tips",featured:!1}],n=()=>r.map(e=>({slug:e.slug}))}};var i=require("../../webpack-runtime.js");i.C(e);var t=e=>i(i.s=e),a=i.X(0,[447,580],()=>t(3271));module.exports=a})();