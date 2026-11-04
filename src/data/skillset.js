export const KW=[
 {re:/meta|facebook|google ads|\bads\b|quảng cáo|paid|performance/i,vi:'Quảng cáo trả phí đa kênh',en:'Multi-channel paid ads',c:'c1'},
 {re:/tiktok|social commerce|e-?commerce|thương mại điện tử/i,vi:'TikTok Ads và TikTok Shop',en:'TikTok Ads and TikTok Shop',c:'c4'},
 {re:/game|\bapp\b|install|cài đặt|cpi|user acquisition|\bua\b/i,vi:'Quảng cáo app và game mobile',en:'Mobile app and game acquisition',c:'c1'},
 {re:/applovin|unity|mintegral|tapjoy|network|dsp|\bsan\b|programmatic/i,vi:'Ad network, DSP và SAN',en:'Ad networks, DSPs and SANs',c:'c1'},
 {re:/\baso\b|\bseo\b|keyword|từ khóa|app store|apple search|store listing/i,vi:'SEO, ASO và Apple Search Ads',en:'SEO, ASO and Apple Search Ads',c:'c2'},
 {re:/ga4|analytics|appsflyer|adjust|firebase|mmp|looker|báo cáo|report|đo lường|measure|roas|cpa/i,vi:'Đo lường và báo cáo (GA4, MMP, ROAS)',en:'Measurement and reporting (GA4, MMP, ROAS)',c:'c1'},
 {re:/kol|koc|influencer|booking/i,vi:'Làm việc với KOL/KOC',en:'KOL/KOC campaigns',c:'c5'},
 {re:/activation|offline|event|sự kiện/i,vi:'Activation và sự kiện offline',en:'Activation and offline events',c:'c7'},
 {re:/trend|competitor|đối thủ|insight|listening/i,vi:'Báo cáo xu hướng và đối thủ',en:'Trend and competitor reporting',c:'c8'},
 {re:/video|capcut|premiere|reels|shorts|ugc|dựng|quay/i,vi:'Sản xuất và chỉ đạo video',en:'Video production and direction',c:'c3'},
 {re:/banner|creative|thiết kế|design|figma|canva|visual/i,vi:'Thiết kế banner và creative',en:'Banner and ad creative design',c:'c1'},
 {re:/\bai\b|chatgpt|claude|prompt|agent/i,vi:'AI cho creative và tối ưu',en:'AI for creative and optimisation',c:'c1'}
];
export const GP=[
 {re:/affiliate|publisher|commission|hoa hồng/i,vi:'Affiliate (chưa có dự án để trưng bày)',en:'Affiliate (no project to show yet)'},
 {re:/3d|motion graphic|cinema 4d|blender/i,vi:'Motion graphic 3D chuyên sâu',en:'Advanced 3D motion graphics'},
 {re:/crm|hubspot|email marketing|zalo oa|marketing automation/i,vi:'CRM và marketing automation',en:'CRM and marketing automation'},
 {re:/code|react|python|sql|lập trình|developer/i,vi:'Lập trình',en:'Programming'},
 {re:/manager|trưởng phòng|head of|quản lý team|lead team/i,vi:'Quản lý đội nhóm',en:'Team management'}
];
export const BUL={
 video:[['Tự quay, dựng và chỉ đạo video quảng cáo','Shoot, edit and direct ad videos myself'],['A/B test hook và offer hằng tuần','Weekly hook and offer A/B tests'],['Điều phối 15 video mỗi tuần cho 2 thương hiệu tại IMCN','Coordinated 15 videos a week for 2 brands at IMCN'],['Video cho TikTok Ads và TikTok Shop','Videos for TikTok Ads and TikTok Shop']],
 banner:[['Thiết kế banner và ảnh tĩnh cho quảng cáo','Design banners and static images for ads'],['Biến thể cho nhiều kích thước và vị trí hiển thị','Variants for several sizes and placements'],['Làm trên Figma và Canva','Built in Figma and Canva'],['Chỉ đạo creative cho chính chiến dịch mình chạy','Directing the creative for the campaigns I run']],
 ads:[['Test creative hằng tuần, mỗi biến thể trả lời một câu hỏi','Weekly creative tests, each variant answering one question'],['Đọc CPA, CTR, CVR, ROAS để chọn creative thắng','Read CPA, CTR, CVR and ROAS to pick winners'],['Dồn ngân sách sang creative và kênh mạnh nhất','Shift budget to the strongest creatives and channels'],['Playable ads cho game mobile','Playable ads for mobile games']],
 ai:[['Video và banner nhanh để test creative cho game tại IndieZ','Fast videos and banners for creative testing on IndieZ games'],['Giữ nguyên UI và component của game','Keep the game\'s UI and components intact'],['Localize cho 7 quốc gia','Localise for 7 countries'],['Soạn script video bằng AI','Draft video scripts with AI']]
};
export const CHB={
 meta:{d:['Quản lý Facebook Ads cho game mobile tại IndieZ.','Managing Facebook Ads for mobile games at IndieZ.'],f:[['Chạy cho 3 game tại IndieZ','Running 3 games at IndieZ'],['Theo dõi CPA, CTR, CVR, ROAS hằng ngày','Daily CPA, CTR, CVR and ROAS tracking'],['Chia ngân sách theo kênh, dịch chi tiêu sang creative mạnh nhất','Budget split by channel, spend shifted to the strongest creatives']]},
 google:{d:['Google Ads cho game mobile, đo lường bằng GA4 và Firebase.','Google Ads for mobile games, measured with GA4 and Firebase.'],f:[['Chạy cho 3 game tại IndieZ','Running 3 games at IndieZ'],['Theo dõi CPA, CTR, CVR, ROAS hằng ngày','Daily CPA, CTR, CVR and ROAS tracking'],['Đo lường bằng GA4 và Firebase','Measured with GA4 and Firebase']]},
 tiktok:{d:['TikTok Ads và TikTok Shop cho thương hiệu mỹ phẩm tại IMCN, và cho game tại IndieZ.','TikTok Ads and TikTok Shop for cosmetics brands at IMCN, and for games at IndieZ.'],f:[['Content plan, setup quảng cáo, ngân sách, tối ưu hằng ngày','Content plan, ad setup, budget and daily optimisation'],['Chỉ đạo 15 video mỗi tuần, A/B test hook và offer','Directed 15 videos a week with hook and offer A/B tests'],['2 thương hiệu mỹ phẩm bán qua TikTok Shop','2 cosmetics brands sold through TikTok Shop']]},
 network:{d:['Ad network, DSP và SAN để mua user cho game mobile.','Ad networks, DSPs and SANs for mobile game user acquisition.'],f:[['AppLovin, Unity Ads, Mintegral, Tapjoy, Gamelight, Kickcash','AppLovin, Unity Ads, Mintegral, Tapjoy, Gamelight, Kickcash'],['DSP và SAN','DSPs and SANs'],['Theo dõi CPI, CVR, ROAS bằng AppsFlyer, Adjust','Tracking CPI, CVR and ROAS in AppsFlyer and Adjust']]},
 asa:{d:['Apple Search Ads kèm ASO iOS và Android.','Apple Search Ads together with iOS and Android ASO.'],f:[['Apple Search Ads cho game iOS','Apple Search Ads for iOS games'],['ASO iOS và Android','iOS and Android ASO'],['Công cụ: Sensor Tower, AppTweak','Tools: Sensor Tower, AppTweak']]}
};
