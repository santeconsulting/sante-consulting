
(function(){
  const path = (location.pathname || "").toLowerCase();
  const isLogin = path.includes("admin-login");

  if (isLogin) {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.classList.add("admin-login-page");
    });
    return;
  }

  const nav = [
    ["admin-dashboard.html","⌂","หน้าหลัก","main"],
    ["admin-courses.html","▤","จัดการหลักสูตร","training"],
    ["admin-training-registrations.html","♟","ผู้สมัครอบรม","training"],
    ["admin-training-sessions.html","▦","รอบการอบรม","training"],
    ["admin-question-import.html","✎","คลังข้อสอบ / นำเข้า","training"],
    ["admin-exams.html","✓","ข้อสอบและผลสอบ","training"],
    ["admin-certificates.html","▣","ใบประกาศนียบัตร","training"],
    ["admin-services.html","◆","งานบริการ","service"],
    ["admin-quotations.html","▧","ใบเสนอราคา","service"],
    ["admin-payments.html","฿","การเงิน / การชำระเงิน","service"],
    ["#","⚙","ตั้งค่าระบบ","system"],
    ["#","◷","Audit Log","system"],
  ];

  const pageInfo = {
    "admin-dashboard": ["แดชบอร์ด","ภาพรวมระบบบริหารจัดการของ SANTE"],
    "admin-courses": ["จัดการหลักสูตร","สร้าง แก้ไข และกำหนดรายละเอียดหลักสูตร"],
    "admin-training-sessions": ["รอบการอบรม","สร้างและจัดการรอบอบรม วันรับสมัคร จำนวนที่นั่ง และการเปิดข้อสอบ"],
    "admin-training-registrations": ["จัดการผู้สมัครอบรม","ตรวจสอบรายชื่อผู้สมัคร สถานะการลงทะเบียน และสถานะการชำระเงิน"],
    "admin-question-import": ["คลังข้อสอบ / นำเข้าข้อสอบ","ตรวจสอบข้อมูล ดูตัวอย่าง และนำข้อสอบเข้าสู่ระบบ"],
    "admin-exams": ["ข้อสอบและผลสอบ","จัดการชุดข้อสอบ เปิดสิทธิ์สอบ และติดตามผลสอบ"],
    "admin-payments": ["การชำระเงิน","ตรวจสอบหลักฐานและยืนยันการชำระเงิน"],
    "admin-services": ["งานบริการ","จัดการคำขอบริการ ตั้งค่ารายการบริการ และสถานะงาน"],
    "admin-quotations": ["ใบเสนอราคา","สร้าง แก้ไข ส่ง และติดตามใบเสนอราคา"],
    "admin-certificates": ["ใบประกาศนียบัตร","ออกวุฒิบัตร ออกแบบ ตรวจสอบ และจัดการเอกสาร"]
  };

  function pageKey(){
    const f=(path.split("/").pop()||"admin-dashboard").replace(".html","");
    return f || "admin-dashboard";
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("au-ready");

    // sidebar
    const aside = document.createElement("aside");
    aside.className = "au-sidebar";
    aside.id = "auSidebar";
    let lastGroup = "";
    let html = `<div class="au-brand"><img src="SANTE-logo-primary.png" alt="SANTE"></div><nav class="au-nav">`;
    for (const [href,icon,label,group] of nav){
      if (group !== lastGroup){
        const groupTitle = group==="main"?"MAIN":group==="training"?"TRAINING & LEARNING":group==="service"?"SERVICE & FINANCE":"SYSTEM";
        html += `<div class="au-nav-title">${groupTitle}</div>`;
        lastGroup = group;
      }
      const active = href !== "#" && path.includes(href.replace(".html",""));
      html += `<a class="au-link ${active?"active":""}" href="${href}" ${href==="#"?'onclick="alert(\'โมดูลนี้กำลังพัฒนา\');return false;"':""}><span class="au-icon">${icon}</span><span>${label}</span></a>`;
    }
    html += `</nav><div class="au-footer"><strong>SANTE SYSTEM</strong>ระบบบริหารจัดการภายใน<br>SANTE Consulting</div>`;
    aside.innerHTML = html;
    document.body.prepend(aside);

    // topbar
    const top = document.createElement("header");
    top.className = "au-topbar";
    top.innerHTML = `
      <div class="au-left">
        <button class="au-menu" id="auMenu" type="button">☰</button>
        <div class="au-search">⌕ &nbsp; ค้นหาหลักสูตร, สมาชิก, การสอบ, เอกสาร...</div>
      </div>
      <div class="au-right">
        <div class="au-avatar">A</div>
        <div class="au-user"><strong>Admin</strong><span id="auEmail">ผู้ดูแลระบบ</span></div>
        <button class="au-logout" type="button" id="auLogout">ออกจากระบบ</button>
      </div>`;
    document.body.insertBefore(top, document.body.children[1]);

    document.getElementById("auMenu")?.addEventListener("click",()=>aside.classList.toggle("open"));
    document.addEventListener("click",(e)=>{
      if(innerWidth<=1050 && aside.classList.contains("open") && !aside.contains(e.target) && e.target?.id!=="auMenu") aside.classList.remove("open");
    });
    document.getElementById("auLogout")?.addEventListener("click",()=>{
      if (typeof window.logout === "function") window.logout();
      else location.href="admin-login.html";
    });

    // find content
    const content = document.querySelector(".main .content, .content");
    if (!content) return;

    // one master cover, identical spirit to Member
    const cover = document.createElement("div");
    cover.className = "au-cover-wrap";
    cover.innerHTML = `
      <picture class="au-cover">
        <source media="(max-width:700px)" srcset="sante-dashboard-hero-mobile.png">
        <img src="sante-dashboard-hero-desktop.png" alt="SANTE — Trust in Safety. Trust in SANTE.">
      </picture>`;
    content.insertBefore(cover, content.firstChild);

    // dashboard needs its own title because its old welcome card is hidden
    if (pageKey()==="admin-dashboard"){
      const info=pageInfo["admin-dashboard"];
      const intro=document.createElement("section");
      intro.className="au-page-intro";
      intro.innerHTML=`<h1>${info[0]}</h1><p>${info[1]}</p>`;
      cover.insertAdjacentElement("afterend",intro);
    }

    // update email from any existing visible DOM if possible
    const candidate = [...document.querySelectorAll("body *")].find(el => /@/.test(el.textContent||"") && (el.textContent||"").length<120);
    if(candidate){
      const m=(candidate.textContent||"").match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
      if(m) document.getElementById("auEmail").textContent=m[0];
    }
  });
})();
