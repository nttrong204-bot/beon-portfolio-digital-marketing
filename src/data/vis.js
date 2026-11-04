/* Schematic illustrations for the Creative tabs (labelled as illustrations, no invented numbers). */
export function visVideo(V){
  var f=[['0–3s','Hook','#a9bcff'],['3–10s',V('Vấn đề → giải pháp','Problem → fix'),'#8b9198'],['10–15s',V('Bằng chứng','Proof'),'#8b9198'],['15s','CTA','#a9bcff']],h='';
  f.forEach(function(x,i){var X=24+i*136;
    h+='<rect x="'+X+'" y="14" width="96" height="170" rx="14" fill="#15181b" stroke="rgba(255,255,255,.14)"/>'+
    '<rect x="'+(X+10)+'" y="30" width="76" height="'+(i===0?70:i===3?40:56)+'" rx="8" fill="'+x[2]+'" fill-opacity="'+(i===0||i===3?'.28':'.12')+'"/>'+
    '<rect x="'+(X+10)+'" y="'+(i===0?110:i===3?82:96)+'" width="'+(i===3?76:58)+'" height="'+(i===3?22:6)+'" rx="'+(i===3?11:3)+'" fill="'+(i===3?'#a9bcff':'rgba(255,255,255,.22)')+'"/>'+
    (i===3?'<text x="'+(X+48)+'" y="97" text-anchor="middle" font-size="11" font-weight="600" fill="#0e1012" font-family="Be Vietnam Pro,sans-serif">'+V('Mua ngay','Shop now')+'</text>':'<rect x="'+(X+10)+'" y="'+(i===0?122:108)+'" width="40" height="6" rx="3" fill="rgba(255,255,255,.12)"/>')+
    '<rect x="'+(X+10)+'" y="160" width="76" height="12" rx="3" fill="rgba(0,0,0,.4)"/><rect x="'+(X+14)+'" y="164" width="50" height="4" rx="2" fill="rgba(255,255,255,.55)"/>'+
    '<text x="'+(X+48)+'" y="206" text-anchor="middle" font-size="12" fill="#eceef1" font-family="JetBrains Mono,monospace">'+x[0]+'</text>'+
    '<text x="'+(X+48)+'" y="222" text-anchor="middle" font-size="11.5" fill="#9097a0" font-family="Be Vietnam Pro,sans-serif">'+x[1]+'</text>';
    if(i<3)h+='<path d="M'+(X+104)+' 99 h24 m-6 -5 l6 5 -6 5" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="1.5"/>';
  });
  return '<svg viewBox="0 0 568 232" role="img" aria-label="'+V('Cấu trúc video quảng cáo 15 giây','15-second ad video structure')+'">'+h+'</svg>';
}
export function visBanner(V){
  var b=[[16,16,104,186,'1080×1920','Story'],[136,16,120,120,'1080×1080','Feed'],[272,16,172,90,'1200×628','Link ad'],[460,16,92,186,'300×600','Display'],[272,122,172,30,'728×90','Leaderboard'],[136,152,120,50,'300×250','MREC']],h='';
  b.forEach(function(r,i){var x=r[0],y=r[1],w=r[2],hh=r[3],big=w>=100&&hh>=90;
    h+='<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+hh+'" rx="8" fill="#15181b" stroke="rgba(255,255,255,.14)"/>';
    if(big){h+='<circle cx="'+(x+w/2)+'" cy="'+(y+hh*.42)+'" r="'+Math.min(w,hh)*.2+'" fill="#a9bcff" fill-opacity=".25"/><rect x="'+(x+10)+'" y="'+(y+10)+'" width="'+w*.5+'" height="6" rx="3" fill="rgba(255,255,255,.3)"/><rect x="'+(x+10)+'" y="'+(y+hh-22)+'" width="'+Math.min(56,w*.5)+'" height="12" rx="6" fill="#a9bcff"/>'}
    else{h+='<rect x="'+(x+8)+'" y="'+(y+hh/2-3)+'" width="'+w*.45+'" height="6" rx="3" fill="rgba(255,255,255,.3)"/><rect x="'+(x+w-44)+'" y="'+(y+hh/2-6)+'" width="36" height="12" rx="6" fill="#a9bcff"/>'}
    h+='<text x="'+(x+w/2)+'" y="'+(y+hh+(i===4?-34:14))+'" text-anchor="middle" font-size="10.5" fill="#9097a0" font-family="JetBrains Mono,monospace">'+(i===4?'':r[4])+'</text>';
  });
  h+='<text x="358" y="170" text-anchor="middle" font-size="10.5" fill="#9097a0" font-family="JetBrains Mono,monospace">728×90</text>';
  return '<svg viewBox="0 0 568 222" role="img" aria-label="'+V('Bộ banner nhiều kích thước','Banner set in several sizes')+'">'+h+'</svg>';
}
export function visTest(V){
  var hooks=['H1','H2','H3','H4'],ang=[V('Góc A','Angle A'),V('Góc B','Angle B'),V('Góc C','Angle C')],win=[1,1],cut=[[0,2],[2,0],[2,3]],h='';
  hooks.forEach(function(k,i){h+='<text x="'+(150+i*100)+'" y="22" text-anchor="middle" font-size="12" fill="#9097a0" font-family="JetBrains Mono,monospace">'+k+'</text>'});
  ang.forEach(function(a,r){h+='<text x="88" y="'+(64+r*62)+'" text-anchor="end" font-size="12.5" fill="#9097a0" font-family="Be Vietnam Pro,sans-serif">'+a+'</text>';
    hooks.forEach(function(_,i){var x=104+i*100,y=36+r*62,w=(r===win[0]&&i===win[1]),bad=cut.some(function(c){return c[0]===r&&c[1]===i});
      h+='<rect x="'+x+'" y="'+y+'" width="92" height="52" rx="10" fill="'+(w?'#a9bcff':'#15181b')+'" fill-opacity="'+(w?'.2':'1')+'" stroke="'+(w?'#a9bcff':'rgba(255,255,255,.12)')+'"/>'+
      '<text x="'+(x+46)+'" y="'+(y+31)+'" text-anchor="middle" font-size="12" font-weight="500" fill="'+(w?'#a9bcff':bad?'#6b7178':'#c3c8cf')+'" font-family="Be Vietnam Pro,sans-serif"'+(bad?' text-decoration="line-through"':'')+'>'+(w?V('thắng · tăng ngân sách','winner · scale'):bad?V('tắt sớm','cut early'):V('đang test','testing'))+'</text>';
    });
  });
  return '<svg viewBox="0 0 520 226" role="img" aria-label="'+V('Ma trận test creative: hook và góc tiếp cận (minh họa)','Creative test matrix of hooks and angles (illustration)')+'">'+h+'</svg>';
}
export function visAI(V){
  var n=[['Brief',''],[V('AI tạo nháp','AI drafts'),''],[V('Biên tập','Edit'),''],[V('Duyệt & chạy','Approve & run'),'']],h='<line x1="70" y1="92" x2="498" y2="92" stroke="rgba(255,255,255,.14)" stroke-width="2" stroke-dasharray="4 6"/>';
  n.forEach(function(x,i){var cx=70+i*143,hi=i===1;
    h+='<circle cx="'+cx+'" cy="92" r="40" fill="'+(hi?'#a9bcff':'#15181b')+'" fill-opacity="'+(hi?'.18':'1')+'" stroke="'+(hi?'#a9bcff':'rgba(255,255,255,.16)')+'"/>'+
    '<text x="'+cx+'" y="98" text-anchor="middle" font-size="17" font-weight="500" fill="#eceef1" font-family="Unbounded,sans-serif">'+(i+1)+'</text>'+
    '<text x="'+cx+'" y="158" text-anchor="middle" font-size="12.5" fill="#c3c8cf" font-family="Be Vietnam Pro,sans-serif">'+x[0]+'</text>';
  });
  return '<svg viewBox="0 0 568 190" role="img" aria-label="'+V('Quy trình sản xuất creative có AI hỗ trợ (minh họa)','AI-assisted creative workflow (illustration)')+'">'+h+'</svg>';
}
