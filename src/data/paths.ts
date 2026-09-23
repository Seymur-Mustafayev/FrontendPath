import type { LearningPath } from '../types';

export const PATHS: LearningPath[] = [
{id:"web",name:"Veb Təməlləri — brauzer, HTTP və şəbəkə",lvl:"j",
 sum:"Frontend-in altındakı mexanika. Bunu bilmədən React öyrənmək — maşını sürməyi bilib mühərrikdən xəbərsiz olmaq deməkdir.",
 goal:"Bir sorğunun brauzerdən serverə gedib ekranda piksel olana qədər keçdiyi yolu ağ lövhədə çəkə bilmək.",
 topics:[
 {t:"Brauzer səhifəni necə render edir",lvl:"j",body:"Brauzer HTML-i oxuyub [[dom]] ağacı, CSS-i oxuyub [[cssom]] qurur. Bu ikisi birləşib [[render-tree]] yaradır, sonra layout (ölçü/mövqe hesablanması) və paint mərhələləri gəlir. Bu ardıcıllığın tam adı [[critical-rendering-path]]-dir.\n\nElementin eni, mövqeyi və ya DOM strukturu dəyişəndə [[reflow]] baş verir — brauzer hesablamanı yenidən aparır. Yalnız rəng, kölgə, opacity dəyişəndə isə daha ucuz olan [[repaint]] işləyir. Buna görə animasiyada width/top yox, transform və opacity istifadə olunur.\n\nPraktik nəticə: render-i bloklayan skript head-də oturursa, istifadəçi ağ ekrana baxır. CSS render-i bloklayır, JS isə parse-i — bu iki fərqi bilmək interview sualıdır.",
  note:"Nə vaxt lazımdır: səhifə niyə yavaş açılır, niyə scroll ilişir, niyə animasiya titrəyir — cavabı hər dəfə bu pipeline-dadır."},
 {t:"HTTP protokolu, metodlar və status kodları",lvl:"j",body:"[[http]] sorğu-cavab protokoludur: metod (GET/POST/PUT/PATCH/DELETE), URL, [[http-header]] və body. Cavabda [[status-code]] gəlir — 200 uğur, 201 yaradıldı, 400 səhv giriş, 401 autentifikasiya yoxdur, 403 icazə yoxdur, 404 tapılmadı, 500 server çöküb.\n\n401 ilə 403 arasındakı fərqi qarışdırmaq gündəlik səhvdir: 401 «sən kimsən bilmirəm», 403 «kim olduğunu bilirəm, icazən yoxdur». Bu fərq UI-da fərqli davranış tələb edir — biri login səhifəsinə atır, digəri xəbərdarlıq göstərir.\n\n[[https]] isə [[tls]] üzərindən şifrələnmiş HTTP-dir; production-da başqa variant yoxdur.",
  terms:["http-header"]},
 {t:"DNS, domain, hosting və CDN",lvl:"j",body:"Ünvan yazılanda ilk iş [[dns]] sorğusudur — domen adı IP-yə çevrilir. Sonra sorğu [[hosting]] mühitindəki serverə çatır. Statik fayllar (JS, CSS, şəkil) adətən [[cdn]] üzərindən verilir ki, istifadəçi ən yaxın nöqtədən alsın.\n\nBu bilik deploy zamanı işə yarayır: sayt dəyişdi amma köhnə görünürsə, səbəb çox vaxt CDN keşidir, sənin kodun deyil.",
  terms:["build-artifact"]},
 {t:"Client–Server modeli və REST API-nin oxunması",lvl:"j",body:"Frontend [[client-server]] modelində müştəri tərəfidir: sorğu göndərir, [[json]] cavab alır, göstərir. [[rest]] üslubunda hər resurs bir [[endpoint]] ilə təmsil olunur: GET /orders siyahı, GET /orders/12 tək element, POST /orders yaradır.\n\nJunior səviyyədə əsas bacarıq: Swagger/Postman sənədini oxuyub sorğunu düzgün qurmaq, cavabın formasını anlamaq və UI-a uyğun modelə çevirmək.",
  terms:["pagination"]},
 {t:"DevTools ilə problem axtarmaq",lvl:"j",body:"[[devtools]] sənin əsas diaqnostika alətindir. [[network-tab]]-da sorğunun statusu, payload-u və cavabı görünür — «data gəlmir» problemlərinin çoxu burada 401, CORS və ya səhv URL kimi görünür.\n\nSources panelində [[breakpoint]] qoyub kodu addım-addım icra etmək console.log yığınından qat-qat sürətlidir. Elements panelində isə hansı CSS qaydasının qalib gəldiyini və hansının üstündən xətt çəkildiyini görürsən.",
  note:"Vərdiş: hər buga başlayanda əvvəl Network, sonra Console, sonra kod. Əks sıra vaxt itkisidir."}
]},

{id:"html",name:"HTML — semantik struktur və əlçatanlıq",lvl:"j",
 sum:"Markup «div yığını» deyil. Semantika SEO, klaviatura naviqasiyası və ekran oxuyucusunun hamısını eyni anda həll edir.",
 goal:"Bir səhifənin markup-una baxıb strukturun mənalı, formanın əlçatan, meta məlumatın düzgün olduğunu deyə bilmək.",
 topics:[
 {t:"Semantik teqlər və sənəd strukturu",lvl:"j",body:"[[semantic-html]] o deməkdir ki, elementin adı məzmunun mənasını bildirir: header, nav, main, article, section, footer. Bunlar eyni zamanda [[landmark]] rolunu oynayır və ekran oxuyucusu onlarla naviqasiya edir.\n\nBaşlıq iyerarxiyası (h1 → h2 → h3) sıralı olmalıdır; başlığı ölçüyə görə seçmək yox, səviyyəyə görə seçmək və ölçünü CSS ilə vermək düzgün yanaşmadır. Kliklənən şey düymədirsə button, keçid edirsə a olmalıdır — div-ə onClick qoymaq klaviatura istifadəçisini kənarda qoyur.",
  terms:["seo","screen-reader"]},
 {t:"Formalar, input növləri və validation",lvl:"j",body:"Form elementi label ilə bağlanmalıdır (for/id) — yoxsa [[screen-reader]] sahənin nə olduğunu bilmir. [[input-type]] düzgün seçiləndə mobil klaviatura və brauzer yoxlaması pulsuz gəlir.\n\nHTML-in öz [[form-validation]] atributları (required, min, pattern) ilk müdafiə xəttidir, lakin son söz deyil — serverdə də yoxlanmalıdır. Fayl və qarışıq data göndərəndə [[formdata]] ən sadə yoldur.",
  terms:["controlled-component"]},
 {t:"Əlçatanlıq (a11y) — praktik minimum",lvl:"jp",body:"[[a11y]] middle səviyyədə «əlavə» deyil, tələbdir. Minimum dəst: hər interaktiv element klaviatura ilə çatılan olsun, [[tab-order]] məntiqli olsun, fokus görünsün, kontrast kifayət etsin.\n\n[[aria]] atributları semantikanın çatmadığı yerdə (custom dropdown, modal, tab) məna əlavə edir. Qızıl qayda: düzgün semantik teq varsa, ARIA yazma — səhv ARIA heç ARIA olmamasından pisdir. Modal açanda [[focus-management]] et: fokusu içəri al, Escape ilə bağla, bağlananda fokusu açan düyməyə qaytar.",
  note:"AIPOS kimi daxili sistemlərdə də vacibdir: operator bütün günü klaviatura ilə işləyir, siçana uzanmaq istəmir."},
 {t:"Meta teqlər, SEO və paylaşım kartları",lvl:"j",body:"[[meta-tag]] dəsti brauzerə və axtarış motoruna səhifə haqqında danışır: title, description, viewport, canonical. [[seo]] üçün struktur (başlıqlar, semantik teqlər, sürət) markup-dan başlayır.\n\nLink paylaşılanda görünən şəkil və başlıq [[open-graph]] teqləri ilə idarə olunur. Next.js-də bunlar metadata API ilə verilir.",
  terms:["ssr"]},
 {t:"Şəkillər, media və yükləmə strategiyası",lvl:"j",body:"Şəkillərə həmişə width/height və ya aspect-ratio ver — əks halda yüklənəndə səhifə sıçrayır və [[cls]] pisləşir. Ekrandan aşağıdakı şəkillərə [[lazy-loading]], fərqli ekranlar üçün [[srcset]] istifadə et.\n\nFormat seçimi ən ucuz qazancdır: [[webp]] eyni keyfiyyəti xeyli kiçik həcmdə verir və birbaşa [[lcp]] metrikasını yaxşılaşdırır.",
  terms:["image-optimization"]}
]},

{id:"css",name:"CSS — layout, responsive və müasir stil sistemləri",lvl:"j",
 sum:"CSS-də əsas mübarizə rəng seçmək deyil — sahəni bölmək, kaskadı idarə etmək və hər ekranda sınmamaqdır.",
 goal:"Hazır dizaynı media query yığını olmadan, token və müasir layout alətləri ilə qurmaq.",
 topics:[
 {t:"Box model, specificity və cascade",lvl:"j",body:"Hər element [[box-model]]-dir: content, padding, border, margin. box-sizing:border-box qoymaq ölçü hesabını sadələşdirir və standart praktikadır.\n\nHansı qaydanın işlədiyini [[specificity]] və [[cascade]] müəyyən edir. !important yazmaq demək olar həmişə strukturun səhv olduğunun əlamətidir — əvəzinə seçicini sadələşdir və ya [[cascade-layer]] istifadə et. Bəzi xassələr ([[inheritance]] ilə) valideyndən övlada keçir, bəziləri yox — font keçir, padding keçmir.",
  terms:["css-variable"]},
 {t:"Flexbox — bir ox üzrə düzülüş",lvl:"j",body:"[[flexbox]] elementləri bir ox üzrə düzür. [[main-axis]] anlayışını başa düşmək açardır: flex-direction dəyişəndə justify-content və align-items rolları da yerini dəyişir.\n\n[[flex-grow]], flex-shrink və flex-basis boş sahənin necə bölüşdürüldüyünü təyin edir. Toolbar, düymə qrupları, kart içindəki sətirlər — bunlar flexbox işidir.",
  terms:["css-grid"]},
 {t:"CSS Grid — iki ox üzrə layout",lvl:"jp",body:"[[css-grid]] səhifə strukturu üçün nəzərdə tutulub. [[grid-template]] ilə sütunları təyin edirsən, [[fr-unit]] qalan sahəni paylayır.\n\nresponsive kart şəbəkəsinin ən qısa yolu: repeat(auto-fill, minmax(240px, 1fr)) — bir dənə də media query olmadan sütun sayı özü uyğunlaşır. Qayda: səhifə/bölmə strukturu Grid, komponent daxili sıralar Flex.",
  terms:["responsive"]},
 {t:"Responsive design və mobile-first yanaşma",lvl:"j",body:"[[responsive]] dizaynda [[mobile-first]] yazmaq daha az kod deməkdir: bazanı dar ekran üçün qur, sonra min-width [[media-query]] ilə genişlət.\n\n[[breakpoint-css]] dəyərlərini cihaz adlarına görə yox, dizaynın həqiqətən sındığı ölçüyə görə seç. Şrift və boşluqlarda [[clamp]] istifadə etsən, aralıq ölçülərdə də səhifə yaraşıqlı qalır.",
  note:"Test vərdişi: DevTools-da eni 360px-ə qədər daralt və üfüqi scroll çıxıbsa, layout səhvdir."},
 {t:"Müasir CSS: dəyişənlər, container query, :has()",lvl:"jp",body:"[[css-variable]] ilə rəng, boşluq və radius tokenləri yaradırsan; tema dəyişdirmək bir neçə dəyişəni yenidən təyin etməyə düşür.\n\n[[container-query]] komponentin öz konteynerinin eninə reaksiya verməsini mümkün edir — eyni kart sidebar-da və geniş sahədə fərqli görünə bilir. [[has-selector]] isə valideyni övlada görə seçir və əvvəllər JS tələb edən halları CSS-də həll edir. Böyük kod bazalarında [[cascade-layer]] prioritet müharibəsini bitirir.",
  terms:["design-token"]},
 {t:"Tailwind CSS və utility-first yanaşma",lvl:"jp",body:"[[tailwind]] hazır atomik siniflərlə işləyir. [[utility-first]] yanaşmanın gücü sürət və ad düşünməməkdir; zəifliyi isə təkrarlanan uzun sinif sətirləridir — həlli təkrarlanan bloku komponentə çevirməkdir, @apply yığınına yox.\n\nTailwind konfiqurasiyası əslində sənin [[design-token]] dəstindir. DevExtreme kimi hazır UI kitabxanası ilə birgə işlədəndə sərhədi aydın saxla: kitabxana komponentinin daxili stilinə utility ilə müdaxilə etmək davamlı həll deyil.",
  terms:["design-system"]},
 {t:"Keçidlər, animasiya və hərəkət hörməti",lvl:"j",body:"[[transition]] tək xassə dəyişikliyi üçün, [[keyframes]] isə çoxmərhələli animasiya üçündür. Performans üçün yalnız transform və opacity animasiya et — qalanı [[reflow]] tətikləyir.\n\n[[prefers-reduced-motion]] sorğusuna hörmət et: istifadəçi sistemdə animasiyanı söndürübsə, sənin səhifən də sakit olmalıdır.",
  terms:["repaint"]}
]},

{id:"js",name:"JavaScript — dilin nüvəsi və icra modeli",lvl:"jp",
 sum:"React bilmək JS bilmək demək deyil. Müsahibədə və real buglarda səni çıxaran şey closure, event loop və referans semantikasıdır.",
 goal:"Kodun nəyə görə o cür işlədiyini izah edə bilmək — «işləyir» yox, «niyə işləyir».",
 topics:[
 {t:"Scope, hoisting, closure və TDZ",lvl:"jp",body:"[[scope]] dəyişənin görünmə sahəsidir; let/const blok səviyyəlidir, var isə funksiya səviyyəli. [[hoisting]] bəyannamələri scope başına qaldırır, amma let/const [[tdz]] içində qalır və müraciətdə xəta verir.\n\n[[closure]] isə funksiyanın yarandığı mühiti yadda saxlamasıdır. React-də ən məşhur nəticəsi stale closure-dur: setInterval və ya köhnə callback içində state-in köhnə dəyəri ilişib qalır. Həlli — funksional yeniləmə (setN(n => n+1)) və ya asılılıqların düzgün verilməsidir.",
  note:"Bu mövzu useEffect və useCallback buglarının kökündədir; bura möhkəm oturmasa React optimizasiyası təxminlə aparılır."},
 {t:"this, prototip zənciri və class",lvl:"jp",body:"[[this]] funksiyanın necə çağırıldığından asılıdır, harada yazıldığından yox — arrow funksiya istisnadır, orada this leksikdir. [[bind]] ailəsi (call/apply/bind) this-i açıq şəkildə təyin edir.\n\nJS-də miras [[prototype]] zənciri ilə işləyir; [[class]] sintaksisi bunun üstündə oxunaqlı qabıqdır. React-in funksional dünyasında bunlar gündəlik lazım olmasa da, köhnə kod, kitabxana daxili və müsahibə üçün lazımdır.",
  terms:["closure"]},
 {t:"Massiv/obyekt əməliyyatları və immutability",lvl:"j",body:"[[map-filter-reduce]] üçlüyü frontend data emalının əsasıdır: çevir, süz, yığ. [[destructuring]] və [[spread]] kodu qısaldır və ən əsası [[immutability]] qaydasını asanlaşdırır.\n\nReact state-i birbaşa dəyişmək (push, obyekt sahəsini yazmaq) re-render tətikləmir, çünki müqayisə referansa görə aparılır. Ona görə həmişə yeni massiv/obyekt qaytar. Dərin obyektlərdə structuredClone və ya Immer faydalıdır.",
  terms:["referential-equality"]},
 {t:"Event loop, call stack və microtask növbəsi",lvl:"m",body:"JS tək thread-lidir: icra [[call-stack]] üzərindən gedir. Asinxron iş bitəndə callback növbəyə düşür və [[event-loop]] stack boşalanda onu götürür.\n\nƏsas nüans: [[microtask]] növbəsi (Promise) [[task-queue]] (setTimeout) növbəsindən əvvəl boşaldılır. Buna görə Promise.resolve().then(...) setTimeout(...,0)-dan əvvəl işləyir. Uzun sinxron hesablama stack-i bloklayır və UI donur — bu, [[inp]] metrikasının pisləşməsinin birbaşa səbəbidir.",
  terms:["promise"]},
 {t:"ES modules, import/export və tree shaking",lvl:"j",body:"[[esm]] statik struktura malikdir — bundler kimin nəyi istifadə etdiyini build zamanı bilir və [[tree-shaking]] ilə artıq kodu atır.\n\n[[named-export]] və default export arasında komanda bir üslub seçməlidir; adlı export refactor və avtomatik importda daha proqnozlaşdırılandır. Ağır kitabxanaları şərti yükləmək üçün [[dynamic-import]] var.",
  terms:["bundle-size"]},
 {t:"DOM API və hadisələrin idarəsi",lvl:"j",body:"Hadisə DOM-da əvvəl aşağı enir, sonra yuxarı qalxır — [[bubbling]] mexanizmi. Bundan istifadə edib siyahının hər sətrinə deyil, valideynə tək [[event-listener]] qoymaq [[event-delegation]] adlanır.\n\nReact-də birbaşa DOM-la işləmək nadirdir, lakin klik-kənar bağlama, ölçü izləmə (ResizeObserver) və klaviatura qısayolları hələ də bu biliyi tələb edir. Əlavə etdiyin hər listener üçün təmizləmə düşün — yoxsa [[memory-leak]] alırsan.",
  terms:["cleanup"]}
]},

{id:"async",name:"Asinxron JavaScript, HTTP işi və API inteqrasiyası",lvl:"jp",
 sum:"Real frontend işinin böyük hissəsi budur: data çək, gözləmə və xəta hallarını idarə et, autentifikasiyanı düzgün qur.",
 goal:"Bir ekranın bütün hallarını (loading, boş, xəta, yenidən cəhd, ləğv) şüurlu şəkildə layihələndirmək.",
 topics:[
 {t:"Promise, async/await və xəta idarəsi",lvl:"j",body:"[[promise]] gələcək nəticəni təmsil edir; [[async-await]] onu oxunaqlı formada yazmağa imkan verir. Hər await ətrafında [[try-catch]] düşünmək lazımdır — tutulmayan rejection production-da səssiz sınıq deməkdir.\n\nBir-birindən asılı olmayan sorğuları ardıcıl await etmək ən çox rast gəlinən performans səhvidir; [[promise-all]] ilə paralel işlət. Biri uğursuz olsa da qalanı lazımdırsa, Promise.allSettled seç.",
  note:"finally bloku loading state-i söndürmək üçün idealdır — həm uğurda, həm xətada işləyir."},
 {t:"fetch, ləğvetmə, timeout və retry",lvl:"jp",body:"[[fetch]] 404 və 500-də xəta atmır — res.ok yoxlaması sənin üzərindədir. Bu, junior kodunda ən çox görülən gizli buglardan biridir.\n\nİstifadəçi yazdıqca axtarış sorğusu gedirsə, köhnəni [[abort-controller]] ilə ləğv et; əks halda cavablar qarışır və ekrana köhnə nəticə düşür. Şəbəkə səhvlərində [[retry]] strategiyası (artan gözləmə ilə) lazımdır — TanStack Query bunu hazır verir.",
  terms:["debounce"]},
 {t:"REST API-nin istehlakçı tərəfdən düzgün oxunması",lvl:"j",body:"[[rest]] API ilə işləyəndə diqqət etməli olduğun şeylər: [[pagination]] formatı (offset/limit yoxsa cursor), filtrlərin ad qaydası, tarix formatı (ISO 8601 və saat qurşağı) və xəta cavabının strukturu.\n\n[[idempotent]] anlayışı təkrar klik problemində işə yarayır: POST təkrarlanarsa iki sifariş yarana bilər — UI-da düyməni bloklamaq və ya serverdən idempotency açarı istəmək lazımdır.",
  terms:["json"]},
 {t:"Autentifikasiya: JWT, cookie və refresh axını",lvl:"m",body:"[[jwt]] imzalanmış tokendir və məzmunu şifrəli deyil — içinə sirr qoyulmur. Saxlanma yeri qərarı təhlükəsizlik qərarıdır: [[http-only-cookie]] XSS-ə qarşı localStorage-dan qat-qat üstündür.\n\nAccess token qısaömürlü olur, bitəndə [[refresh-token]] ilə yenilənir. Frontenddə bunu interceptor-da bir dəfə qurmaq və paralel 401-lərin hamısını tək yenilənmə sorğusuna yönləndirmək lazımdır. Korporativ mühitdə giriş çox vaxt [[oauth]]/OIDC üzərindən olur.",
  terms:["same-site-cookie"]},
 {t:"CORS, preflight və same-origin siyasəti",lvl:"jp",body:"[[same-origin]] siyasəti brauzerin təhlükəsizlik əsasıdır. Başqa domenə sorğu gedəndə [[cors]] başlıqları cavabı oxumağa icazə verir; xüsusi başlıq və ya PUT/DELETE olduqda əvvəlcə [[preflight]] OPTIONS sorğusu gedir.\n\nVacib nüans: CORS problemi frontenddə həll olunmur — cavab başlıqlarını server verməlidir. Dev mühitində proxy müvəqqəti həlldir, production üçün backend konfiqurasiyası lazımdır.",
  note:"Bu mövzu müsahibədə çox soruşulur və cavabın «proxy yazdım» olması kifayət etmir — mexanizmi izah et."},
 {t:"Real-time: WebSocket, SSE və polling",lvl:"m",body:"Canlı data üçün üç variant var: sadə [[polling]] (interval ilə sorğu), tək istiqamətli [[sse]] və ikitərəfli [[websocket]].\n\nSeçim tələbdən asılıdır: bildiriş və canlı status üçün SSE bəs edir, chat və əməkdaşlıq üçün WebSocket lazımdır. Bağlantının qopması, yenidən qoşulma və komponent unmount olanda təmizləmə — bu hissəni unutmaq yaddaş sızmasının klassik yoludur.",
  terms:["cleanup"]}
]},

{id:"ts",name:"TypeScript — tiplə düşünmək",lvl:"jp",
 sum:"Sənin gündəlik dilin. Fərq junior və middle arasında: tipi «səhv susdurmaq» üçün yox, modelləşdirmək üçün istifadə etmək.",
 goal:"any yazmadan, as ilə susdurmadan, mümkün olmayan state-i tiplə qeyri-mümkün etmək.",
 topics:[
 {t:"Tip sisteminin əsasları və inference",lvl:"j",body:"[[static-typing]] səhvi işləmə anında yox, yazarkən tutur. [[type-inference]] sayəsində hər yerə annotasiya yazmaq lazım deyil — funksiya qaytarma tipini çox vaxt TS özü çıxarır.\n\n[[union-type]] və [[literal-type]] ilə mümkün dəyərləri məhdudlaşdırmaq UI state-ini modelləşdirməyin ən sadə yoludur: status: 'idle' | 'loading' | 'error'.",
  terms:["type-assertion"]},
 {t:"interface, type və generics",lvl:"jp",body:"[[interface]] obyekt formaları və genişləndirmə üçün rahatdır, type isə union, tuple və şərti tiplərdə güclüdür. Praktikada vacib olan komandanın vahid qaydası saxlamasıdır.\n\n[[generic]] təkrar istifadə olunan kodun əsasıdır: useApi<Order[]>() kimi. [[constraint]] ilə generic-in nə qəbul etdiyini məhdudlaşdırırsan — <T extends {id:number}>. Yaxşı generic API-ni çevik edir, həddindən artıq generic isə kodu oxunmaz edir.",
  terms:["tanstack-query"]},
 {t:"Utility types ilə mövcud tipləri törətmək",lvl:"jp",body:"[[utility-type]] dəsti təkrarı aradan qaldırır: [[partial]] PATCH DTO-ları üçün, [[pick-omit]] həssas sahələri çıxarmaq üçün, [[record]] lüğətlər üçün.\n\nƏsas prinsip: tipi əl ilə kopyalama, mövcud tipdən törət. Mənbə dəyişəndə törəmə tiplər avtomatik uyğunlaşır və köhnəlmə problemi yaranmır.",
  terms:["declaration-file"]},
 {t:"Narrowing, type guard və discriminated union",lvl:"m",body:"[[narrowing]] typeof, in, Array.isArray yoxlamaları ilə union tipdən konkret tipə enməkdir. Mürəkkəb hallarda öz [[type-guard]] funksiyanı yazırsan.\n\nƏn güclü nümunə [[discriminated-union]]-dur: {status:'success', data} | {status:'error', message} modeli mümkün olmayan kombinasiyaları (həm loading, həm data ilə) tipdə qeyri-mümkün edir. switch-də [[never]] ilə exhaustive yoxlama qursan, yeni variant əlavə edəndə kompilyator səni tapacaq.",
  note:"Bu, junior TS ilə middle TS arasındakı ən görünən fərqdir — isLoading/isError boolean yığını əvəzinə tək vəziyyət modeli."},
 {t:"API sərhədində tip təhlükəsizliyi (Zod)",lvl:"m",body:"TS tipi işləmə anında yoxdur. Yəni API səhv data qaytarsa, tip sənə yalan deyir. Həlli sərhəddə [[schema-validation]] etməkdir — [[zod]] sxemi həm yoxlayır, həm də TS tipini özü çıxarır.\n\nQayda: xarici datanı [[unknown-type]] kimi qəbul et, yoxla, sonra istifadə et. [[type-assertion]] (as) yoxlama deyil, sadəcə söz vermədir — sərhəddə ondan qaçın.",
  terms:["form-validation"]},
 {t:"tsconfig, strict rejim və konfiqurasiya",lvl:"jp",body:"[[strict-mode]] açıq olmalıdır; xüsusilə strictNullChecks null/undefined buglarının böyük hissəsini bloklayır. [[tsconfig]]-də paths ilə alias qurmaq import yollarını təmizləyir.\n\nJS kitabxanasının tipi yoxdursa [[declaration-file]] yazılır. CI-da tsc --noEmit ayrıca addım kimi işlədilməlidir — Vite/Next build-i hər zaman tipləri tam yoxlamır.",
  terms:["ci"]}
]},

{id:"react",name:"React — komponent arxitekturası və render modeli",lvl:"jp",
 sum:"Sənin əsas alətin. Burada hədəf yeni API öyrənmək deyil — render-in nə vaxt və niyə baş verdiyini dəqiq bilmək.",
 goal:"Komponentin niyə render olduğunu ölçü ilə izah edə bilmək və məntiqi UI-dan təmiz ayırmaq.",
 topics:[
 {t:"Komponent, props, JSX və kompozisiya",lvl:"j",body:"[[component]] props qəbul edib [[jsx]] qaytaran funksiyadır. [[props]] oxunandır — övlad onu dəyişmir, dəyişmək lazımdırsa callback yuxarı göndərilir.\n\nReact-də təkrar istifadə mirasla yox, [[composition]] ilə qurulur: children, render prop, slot şəklində komponent ötürmək. «Config prop-ları şişən komponent» görəndə bu, adətən kompozisiya ilə bölünməli olduğunun siqnalıdır.",
  terms:["headless-component"]},
 {t:"State, re-render və batching",lvl:"jp",body:"[[state]] dəyişəndə komponent funksiyası yenidən çağırılır — buna [[re-render]] deyilir. Vacib nüans: re-render DOM yenilənməsi demək deyil; React virtual nəticəni müqayisə edib yalnız fərqi tətbiq edir.\n\nReact 18+ [[batching]] ilə bir neçə setState-i tək render-də birləşdirir, hətta async kodda. State-i mümkün qədər istifadə olunduğu yerə yaxın saxla — yuxarı qaldırılmış state bütün ağacı render etdirir.",
  terms:["immutability"]},
 {t:"useEffect və yan təsirlərin idarəsi",lvl:"jp",body:"[[useeffect]] render-dən sonra kənar dünya ilə sinxronizasiya üçündür: abunə, timer, analitika, DOM ölçmə — yəni [[side-effect]]. Data çəkmək üçün ilk seçim olmamalıdır; server datası TanStack Query və ya server komponentinə aiddir.\n\n[[dependency-array]] effektin nə vaxt yenidən işləyəcəyini təyin edir; exhaustive-deps qaydasını söndürmək problemi gizlədir, həll etmir. Abunə/timer qurursansa mütləq [[cleanup]] qaytar.",
  note:"Özünə sual ver: «bu effekt kənar dünya ilə sinxronlaşdırır, yoxsa sadəcə render zamanı hesablana bilər?» İkincidirsə, effekt lazım deyil."},
 {t:"Formalar: controlled, uncontrolled və React Hook Form",lvl:"jp",body:"[[controlled-component]] tam nəzarət verir, lakin hər hərfdə render olur. Böyük formalarda [[uncontrolled]] yanaşma (dəyər DOM-da, ref ilə oxunur) daha sürətlidir.\n\n[[react-hook-form]] bu ikisinin praktik balansıdır: minimal re-render, Zod resolver ilə validasiya, asan xəta göstərilməsi. DevExtreme Form ilə işləyəndə isə eyni prinsipləri onun öz validation mexanizmi ilə tətbiq edirsən — vacib olan, validasiya qaydalarının tək mənbədə (sxemdə) saxlanmasıdır.",
  terms:["schema-validation"]},
 {t:"Custom hook-lar və məntiqin ayrılması",lvl:"jp",body:"[[custom-hook]] hook məntiqini komponentdən ayırmağın standart yoludur: useOrders, useDebouncedValue, usePermissions. Beləliklə komponent «necə»-ni yox, «nə»-ni göstərir — [[separation-of-concerns]].\n\n[[rules-of-hooks]] pozulmamalıdır: şərt, dövr və ya erkən return daxilində hook çağırmaq olmaz, çünki React onları sıra ilə eyniləşdirir. Yaxşı custom hook bir işi görür və aydın interfeys qaytarır.",
  terms:["renderhook"]},
 {t:"Context API və prop drilling",lvl:"jp",body:"[[prop-drilling]] eyni props-u bir neçə qat aşağı ötürməkdir; kiçik miqyasda problem deyil, böyüyəndə [[context]] və ya kompozisiya ilə həll olunur.\n\nContext performans tələsi ilə gəlir: [[provider]] value dəyişəndə bütün istehlakçılar render olur. Ona görə value-nu useMemo ilə sabitlə və tez-tez dəyişən dataları ayrı context-ə böl. Context qlobal state meneceri deyil — server datası üçün ondan istifadə etmə.",
  terms:["referential-equality"]},
 {t:"Performans: memo, useMemo, useCallback",lvl:"m",body:"[[react-memo]] props dəyişməyibsə komponenti render etməkdən saxlayır. Amma props-da hər render yeni yaranan obyekt/funksiya varsa memo sınır — səbəb [[referential-equality]]-dir. [[usecallback]] funksiya referansını, [[usememo]] hesablama nəticəsini sabit saxlayır.\n\nƏn vacib qayda: əvvəl ölç, sonra optimizasiya et. [[profiler]] ilə hansı komponentin nə qədər render olduğunu gör. Hər yerə useMemo səpmək kodu ağırlaşdırır və özü də xərcdir. React Compiler gələcəkdə bunun çoxunu avtomatlaşdırır, amma səbəbi bilmək yenə tələbdir.",
  note:"Sənin zəif nöqtən burada testlə kəsişir: memoizasiyanı testdə render sayğacı ilə yoxlamaq — Testing yolundakı «Memoizasiya testi» mövzusuna bax."},
 {t:"Error boundary, Suspense və lazy yükləmə",lvl:"m",body:"[[error-boundary]] render xətasını tutub ehtiyat UI göstərir; onsuz bir komponentin xətası bütün tətbiqi ağ ekrana çevirir. Marşrut səviyyəsində ən azı bir dənə olmalıdır.\n\n[[suspense]] hazır olmayan məzmun üçün fallback verir və React.lazy ilə [[code-splitting]] etməyə imkan yaradır. Ağır səhifələri (hesabatlar, qrafiklər, redaktorlar) belə ayırmaq ilk yüklənməni nəzərəçarpacaq dərəcədə yüngülləşdirir.",
  terms:["dynamic-import"]}
]},

{id:"state",name:"State idarəsi — client state və server state fərqi",lvl:"m",
 sum:"Middle səviyyənin ayırıcı sualı: bu data kimindir? Serverin datasını Redux-a doldurmaq ən bahalı arxitektura səhvlərindəndir.",
 goal:"Hər data parçası üçün doğru yeri seçmək: URL, server keşi, qlobal store, yoxsa lokal state.",
 topics:[
 {t:"Client state vs server state",lvl:"m",body:"[[client-state]] yalnız UI-a aiddir: açıq modal, seçilmiş tab, forma qaralaması. [[server-state]] isə serverdə yaşayır, köhnəlir, başqa istifadəçi tərəfindən dəyişə bilər və keşlənməlidir.\n\nBu iki tip fərqli alət tələb edir. Server datasını qlobal store-a əl ilə kopyalayanda sən əslində keş meneceri yazmağa başlayırsan — sinxronlaşdırma, köhnəlmə, təkrar cəhd. Bu işi hazır kitabxana daha yaxşı edir.",
  terms:["cache-invalidation"]},
 {t:"TanStack Query ilə server state",lvl:"m",body:"[[tanstack-query]] datanı [[query-key]] ilə keşləyir. Açar dəyişəndə avtomatik yeni sorğu gedir — filtrləri açara salmaq useEffect yığınından xilas edir.\n\n[[stale-time]] datanın nə qədər təzə sayılacağını təyin edir: 0 olsa hər fokusда [[refetch]] olur, çox olsa köhnə data göstərilir. Hesabat ekranında böyük staleTime, qalıq/stok ekranında kiçik staleTime məntiqlidir. Bu qərarı şüurlu verməyi öyrən.",
  note:"AIPOS tipli sistemlərdə tez-tez dəyişən data (qalıq, sifariş statusu) ilə sabit data (kataloq, ölçü vahidləri) üçün eyni staleTime vermək tipik səhvdir."},
 {t:"Mutasiyalar, invalidation və optimistic update",lvl:"m",body:"Data yazan əməliyyat [[mutation]]-dur. Uğurdan sonra standart addım [[cache-invalidation]] — dəyişən siyahıları köhnə elan edib yeniləmək.\n\nSürətli hiss üçün [[optimistic-update]] istifadə olunur: UI dərhal yenilənir, xəta olarsa [[rollback]] edilir. Bu yanaşma ucuz deyil — onSuccess/onError/onSettled məntiqini düzgün yazmaq lazımdır. Sadə və nadir əməliyyatlarda invalidation kifayətdir.",
  terms:["idempotent"]},
 {t:"Zustand və Redux Toolkit ilə qlobal client state",lvl:"m",body:"[[zustand]] az boilerplate ilə qlobal client state verir; [[redux-toolkit]] isə böyük komandalarda ciddi nizam və DevTools dəstəyi ilə güclüdür.\n\nHər ikisində əsas performans qaydası eynidir: [[selector]] ilə yalnız lazım olan hissəni abunə et, bütün [[store]]-u yox. Əks halda store-un hər dəyişikliyi bütün komponentləri render edir.",
  terms:["context"]},
 {t:"URL-i state kimi istifadə etmək",lvl:"m",body:"Filtr, səhifə nömrəsi, axtarış sözü və seçilmiş tab çox vaxt [[url-state]] olmalıdır. Səbəb sadədir: link paylaşıla bilir, geri düyməsi işləyir, səhifə yenilənəndə vəziyyət itmir.\n\n[[query-param]] dəyərlərini [[search-params]] hook-u ilə oxuyub yazırsan və eyni dəyərləri query key-ə verirsən — beləliklə URL, keş və UI tək həqiqət mənbəyi ətrafında birləşir.",
  terms:["query-key"]}
]},

{id:"next",name:"Next.js və renderinq modelləri",lvl:"m",
 sum:"Eyni React kodunun harada icra olunduğu — brauzerdə, serverdə, yoxsa build zamanı — məhsulun sürətini və SEO-sunu müəyyən edir.",
 goal:"Hər səhifə üçün render strategiyasını səbəbi ilə seçə bilmək və keşləmə davranışını idarə etmək.",
 topics:[
 {t:"CSR, SSR, SSG, ISR və hydration",lvl:"m",body:"[[csr]]-də HTML boş gəlir və hər şeyi JS çəkir — daxili panellər üçün normal, ictimai sayt üçün zəifdir. [[ssr]] HTML-i serverdə hazırlayır: ilk görüntü tez, data təzə. [[ssg]] build zamanı hazırlayır — ən sürətlisi. [[isr]] isə statik səhifəni fonda müəyyən intervalla yeniləyir.\n\n[[hydration]] serverdən gələn HTML-ə JS-in qoşulmasıdır. Server və client fərqli nəticə render edirsə (məsələn new Date() və ya localStorage istifadəsi) hydration xətası alırsan — bu, Next.js-də ən çox rast gəlinən səhvlərdəndir.",
  terms:["lcp"]},
 {t:"App Router, Server Components və Server Actions",lvl:"m",body:"[[app-router]]-də komponentlər default olaraq [[rsc]]-dir: serverdə işləyir, bundle-a düşmür, DB/API-yə birbaşa müraciət edə bilir. 'use client' yalnız interaktivlik lazım olan yerdə yazılır.\n\n[[server-action]] ilə formanı API route yazmadan serverdə emal edirsən. [[streaming]] isə səhifəni hissə-hissə göndərib hazır olanı dərhal göstərir. Praktik qayda: client sərhədini mümkün qədər aşağı, yarpaq komponentlərə itələ.",
  terms:["suspense"]},
 {t:"Routing, layout və vəziyyət UI-ları",lvl:"jp",body:"[[file-based-routing]]-də qovluq strukturu URL-i təyin edir. [[layout]] marşrutlar arasında qorunur və naviqasiyada yenidən render olunmur — sidebar, header oraya gedir.\n\nloading.tsx və error.tsx ilə hər marşrut üçün gözləmə və xəta UI-ı deklarativ verilir. Server tərəfli endpoint lazım olduqda [[route-handler]] yazılır.",
  terms:["error-boundary"]},
 {t:"Data fetching və keşləmə strategiyaları",lvl:"m",body:"Next.js-in keşləmə qatları (request memoization, data cache, full route cache) faydalıdır, amma səhv anlaşılanda «data yenilənmir» problemi yaradır. [[revalidate]] və cache seçimlərini hər fetch üçün şüurlu ver.\n\n[[cache-strategy]] qərarında sual sadədir: bu məlumat bütün istifadəçilər üçün eynidir, yoxsa şəxsidir? Nə qədər köhnə ola bilər? Şəxsi datanı statik keşə buraxmaq təhlükəsizlik problemidir.",
  terms:["stale-time"]},
 {t:"Deployment, mühit dəyişənləri və build",lvl:"jp",body:"[[env-variable]] mühitə görə dəyişir; NEXT_PUBLIC_ prefiksi dəyəri brauzerə çıxarır — açar və sirrləri oraya qoymaq real təhlükəsizlik səhvidir.\n\n[[build-artifact]] bir dəfə yığılıb bütün mühitlərə paylanmalıdır. [[vercel]] Next.js üçün ən az konfiqurasiya tələb edir; Azure App Service / Static Web Apps isə korporativ mühitdə standartdır və pipeline ilə birləşir.",
  terms:["pipeline"]}
]},

{id:"test",name:"Testing — Vitest, Testing Library və Playwright",lvl:"m",
 sum:"Sənin hazırkı prioritet boşluğun. Test bilməyən middle developer refaktorinq edə bilmir, çünki nəyi sındırdığını bilmir.",
 goal:"Bir feature yazanda hansı testin yazılmalı olduğunu düşünmədən bilmək və memoizasiya kimi incə şeyləri davranışla test etmək.",
 topics:[
 {t:"Nə test edilməli — test piramidası və dəyər",lvl:"m",body:"[[test-pyramid]]: çox [[unit-test]], daha az [[integration-test]], ən az [[e2e]]. Frontenddə isə ağırlıq mərkəzi inteqrasiya testlərindədir — bir komponent + onun hook-ları + mock API birlikdə.\n\nTest yazarkən sual «bu funksiya işləyirmi?» deyil, «istifadəçi bu axını tamamlaya bilirmi?» olmalıdır. [[coverage]] rəqəminin arxasınca qaçma; kritik axınlar (giriş, sifariş yaratma, ödəniş) əhatə olunmalıdır.",
  note:"Başlanğıc üçün praktik qayda: hər düzəltdiyin bug üçün onu təkrarlayan bir test yaz. Bir ayda real test dəstin olur."},
 {t:"Vitest əsasları və test yazma quruluşu",lvl:"m",body:"[[vitest]] Vite əsaslıdır, Jest API-si ilə uyğundur və sürətlidir. Test faylı describe/it blokları ilə qurulur, yoxlama [[assertion]] ilə aparılır.\n\nYaxşı test: bir davranışı yoxlayır, adı nəyi yoxladığını deyir (should show error when API fails), və Arrange-Act-Assert quruluşunu saxlayır. [[test-runner]] watch rejimində işlədilir — yazarkən dərhal nəticə görünür.",
  terms:["coverage"]},
 {t:"React Testing Library ilə davranış testi",lvl:"m",body:"[[rtl]]-in fəlsəfəsi: implementasiyanı yox, istifadəçinin gördüyünü test et. Ona görə state-ə deyil, ekrandakı mətn və rollara baxılır.\n\n[[query-by-role]] ən dayanıqlı seçim üsuludur, çünki əlçatanlıq ağacı üzərindən işləyir — eyni zamanda a11y-ni də dolayısı ilə yoxlayır. İstifadəçi hərəkətləri üçün [[user-event]] işlət (fireEvent yox), asinxron nəticəni findBy... ilə gözlə. [[act]] xəbərdarlığı görsən, demək state yeniləməsi gözlənilməyən yerdə baş verir.",
  terms:["a11y"]},
 {t:"Mocking, MSW və test təcridi",lvl:"m",body:"[[mock]] real asılılığı əvəzləyir, [[spy]] isə çağırışları izləyir. Şəbəkə üçün ən yaxşı yanaşma fetch-i mock etmək deyil, [[msw]] ilə API-ni şəbəkə səviyyəsində saxtalaşdırmaqdır — kod real fetch işlədir, cavab isə nəzarətdədir.\n\nBeləliklə eyni mock-ları həm testdə, həm dev mühitində işlədə bilirsən və backend hazır olmadan UI yazmaq mümkün olur.",
  terms:["fetch"]},
 {t:"Hook və memoizasiya testi (useMemo/useCallback)",lvl:"m",body:"Hook-u təcrid olunmuş test etmək üçün [[renderhook]] var; nəticə result.current ilə oxunur və props dəyişikliyi [[rerender]] ilə simulyasiya olunur.\n\n[[memoization-test]] üçün qızıl qayda: useMemo-nun özünü test etmə — nəticəsini test et. İki üsul var: (1) bahalı funksiyanı vi.fn() ilə əvəzləyib props dəyişməyəndə yenidən çağırılmadığını yoxlamaq, (2) referansın əvvəlki render ilə eyni qaldığını (toBe) təsdiqləmək. Övlad komponentin lazımsız render olmadığını isə render sayğacı ilə ölçürsən.",
  note:"Bu mövzu sənin iki zəif sahənin (testing + React performans) kəsişməsidir — ilk yazacağın 3 testdən biri burada olsun."},
 {t:"Playwright ilə E2E və sabit testlər",lvl:"m",body:"[[playwright]] real brauzerdə tam axını yoxlayır və auto-wait mexanizmi ilə çoxlu gözləmə kodundan xilas edir.\n\n[[selector-strategy]] kritikdir: CSS sinifinə bağlanan test ilk refaktorinqdə düşür — role, label və ya data-testid işlət. [[flaky-test]] ən böyük düşməndir; səbəbi adətən sabit sleep və yarış şəraitidir — həlli açıq gözləmə şərtləri və testlərin bir-birindən asılı olmamasıdır.",
  terms:["ci"]}
]},

{id:"git",name:"Git və CI/CD — Azure DevOps axını",lvl:"m",
 sum:"İkinci prioritet boşluğun. Kod yazmaq bacarığı komanda axınını bilmədən yarımçıqdır — burada səhvlər bütün komandaya toxunur.",
 goal:"Tarixçəni təmiz saxlamaq, konflikti qorxmadan həll etmək və pipeline-ın niyə düşdüyünü özün tapmaq.",
 topics:[
 {t:"Git-in nüvəsi: commit, branch, HEAD",lvl:"jp",body:"[[commit]] anlıq şəkildir; [[branch]] isə sadəcə commit-ə işarə edən göstəricidir — bunu başa düşmək Git-in yarısıdır. [[head]] hazırda harada olduğunu göstərir.\n\nYaxşı commit atomikdir: bir məntiqi dəyişiklik, aydın mesaj (nə etdin və niyə). «fix», «update» kimi mesajlar bir həftə sonra heç kimə heç nə demir. Conventional Commits formatı (feat:, fix:) avtomatik changelog və [[semantic-versioning]] üçün əsas yaradır.",
  terms:["merge"]},
 {t:"Merge, rebase və konfliktlərin həlli",lvl:"m",body:"[[merge]] tarixçəni olduğu kimi birləşdirir, [[rebase]] isə commit-lərini yeni bazanın üstünə köçürüb düz xətt yaradır. Qızıl qayda: paylaşılan budaqda rebase etmə — başqalarının tarixçəsini sındırır.\n\n[[merge-conflict]] səhv deyil, normal haldır: hər iki tərəfi oxu, düzgün nəticəni yaz, markerləri sil, test et, sonra davam et. [[interactive-rebase]] ilə commit-ləri [[squash]] edib təmizləyə, [[cherry-pick]] ilə tək düzəlişi başqa budağa köçürə bilərsən.",
  note:"Təcrübə üsulu: test repo yarat, qəsdən konflikt yarat və həll et. Konfliktdən qorxu yalnız təkrarla keçir."},
 {t:"Branching strategiyaları və PR mədəniyyəti",lvl:"m",body:"[[trunk-based]] yanaşmada budaqlar qısaömürlüdür və tez-tez main-ə birləşir — CI/CD ilə müasir standartdır. [[git-flow]] isə release qrafiki olan məhsullarda hələ də rast gəlinir.\n\n[[pull-request]] koda baxış qapısıdır. Yaxşı PR kiçikdir, təsviri var və nəyi niyə dəyişdiyini izah edir. [[code-review]]-də şəxsə yox, koda bax; təklifini səbəbi ilə yaz. Rəy alan tərəf kimi: müdafiə etmə, səbəbi soruş.",
  terms:["squash"]},
 {t:"Azure DevOps: Boards, Repos, Pipelines",lvl:"m",body:"[[azure-devops]] üç hissədən ibarətdir: Boards (iş elementləri), Repos (Git) və [[pipeline]]. Commit mesajında iş elementi nömrəsini (#1234) qeyd etmək dəyişikliklə tapşırığı bağlayır və izlənilə bilən olur.\n\nBranch policy-lər praktikada vacibdir: main-ə birbaşa push qadağası, minimum bir reviewer, build-in uğurlu olması şərti. Bunlar «komandada necə işlənir» sualının cavabıdır.",
  terms:["pull-request"]},
 {t:"CI/CD: build, test və deploy avtomatlaşdırması",lvl:"m",body:"[[ci]] hər push-da build, lint və testi avtomatik işlədir; [[cd]] isə keçən dəyişikliyi mühitə çıxarır. Tipik [[yaml-pipeline]] addımları: install → lint → type-check → test → build → [[artifact]] dərci → deploy.\n\nYerli səviyyədə [[pre-commit-hook]] (Husky + lint-staged) səhvi CI-a çatmadan tutur. Pipeline düşəndə panik etmə — log-u yuxarıdan aşağı oxu, düşən addımı tap və eyni əmri lokalda işlət.",
  terms:["build-artifact"]}
]},

{id:"perf",name:"Performans və Core Web Vitals",lvl:"m",
 sum:"Middle-dən gözlənilən: «yavaşdır» şikayətini ölçüyə çevirmək və konkret səbəb göstərmək.",
 goal:"Ölçmədən optimizasiya etməmək; bundle, render və şəbəkə arasında əsl darboğazı tapmaq.",
 topics:[
 {t:"Core Web Vitals: LCP, INP, CLS",lvl:"m",body:"[[lcp]] ən böyük görünən elementin çıxma vaxtıdır (hədəf < 2.5s), [[inp]] istifadəçi hərəkətinə cavab gecikməsidir (< 200ms), [[cls]] isə gözlənilməz yerdəyişmədir (< 0.1).\n\n[[lighthouse]] laboratoriya ölçüsüdür — real istifadəçi datası (RUM) ilə eyni deyil. CLS-in ən ucuz həlli: şəkil və reklam sahələrinə əvvəlcədən ölçü vermək, şriftdə swap istifadə etmək.",
  terms:["font-display"]},
 {t:"Bundle ölçüsü və kodun bölünməsi",lvl:"m",body:"[[bundle-size]] frontend sürətinin ən böyük düyməsidir. Əvvəl ölç: bundle analyzer ilə ən ağır paketləri gör (tarix kitabxanaları, chart, ikon dəstləri, lokalizasiya faylları klassik günahkarlardır).\n\nSonra [[code-splitting]] et: marşrut səviyyəsində və ağır komponentlərdə [[dynamic-import]]. [[tree-shaking]]-in işləməsi üçün adlı import istifadə et — bütün kitabxananı default import etmək onu söndürür.",
  terms:["esm"]},
 {t:"Şəkil, şrift və resurs optimizasiyası",lvl:"jp",body:"[[image-optimization]] ən sürətli qazancdır: düzgün format, uyğun ölçü, srcset və ölçü atributları. [[font-display]]: swap mətnin görünməz qalmasının qarşısını alır.\n\nKritik resurslara [[preload]], ehtimal olunanlara prefetch. Üçüncü tərəf skriptləri (analitika, chat widget) çox vaxt ən ağır hissədir — onları gecikdirməklə INP-də ciddi irəliləyiş olur.",
  terms:["cdn"]},
 {t:"Böyük siyahılar, virtualizasiya və input tezliyi",lvl:"m",body:"Minlərlə sətri DOM-a yığmaq brauzeri boğur. Həll [[virtualization]]/[[windowing]]: yalnız görünən sətirlər render olunur. DevExtreme DataGrid-də bu, virtual scrolling və paging rejimləri ilə verilir.\n\nAxtarış inputu və scroll kimi tez-tez işə düşən hadisələrdə [[debounce]]/throttle tətbiq et — həm sorğu sayı, həm render sayı azalır.",
  terms:["abort-controller"]},
 {t:"Ölçmə alətləri: Profiler, Performance, yaddaş",lvl:"m",body:"[[profiler]] ilə hansı komponentin nə qədər və niyə render olduğunu görürsən — optimizasiyadan əvvəl bu addım məcburidir. Brauzerin Performance panelində [[flame-chart]] uzun tapşırıqları (long task) göstərir.\n\n[[memory-leak]] SPA-da səhifə gəzdikcə ağırlaşma kimi hiss olunur; səbəb adətən təmizlənməyən listener, timer və ya abunədir. Memory snapshot müqayisəsi ilə tapılır.",
  terms:["cleanup"]}
]},

{id:"tool",name:"Tooling — build, lint, paketlər və iş mühiti",lvl:"jp",
 sum:"Gündəlik sürətini təyin edən görünməz qat. Burada bir saat sərf etmək hər həftə saatlar qaytarır.",
 goal:"Layihəni sıfırdan qura bilmək: build, lint, format, tip yoxlaması və skriptlər.",
 topics:[
 {t:"Vite, bundler və dev server",lvl:"jp",body:"[[vite]] dev zamanı ESM-dən istifadə edir və [[hmr]] ilə dəyişikliyi anında göstərir; production build-i isə [[bundler]] (Rollup) aparır.\n\nDev və production davranışının fərqli olduğunu bil — dev-də işləyən bəzi şeylər build-də sınır. Ona görə build-i lokalda ən azı bir dəfə işlədib yoxlamaq vərdiş olmalıdır.",
  terms:["bundle-size"]},
 {t:"ESLint, Prettier və kod konvensiyaları",lvl:"j",body:"[[eslint]] səhvləri və pis nümunələri tapır, [[prettier]] isə formatı avtomatlaşdırır — ikisi ayrı məsuliyyətdir. TypeScript üçün typescript-eslint qaydaları əlavə olunur.\n\nBir [[lint-rule]] əngəl olursa, söndürmədən əvvəl niyə mövcud olduğunu oxu — xüsusilə react-hooks/exhaustive-deps. Qaydalar komanda razılaşmasıdır; redaktor üzərində deyil, repoda saxlanır.",
  terms:["pre-commit-hook"]},
 {t:"npm/pnpm, package.json və lock file",lvl:"j",body:"[[npm]] və ya [[pnpm]] asılılıqları idarə edir. [[lock-file]] dəqiq versiyaları sabitləyir və mütləq repoya kommit olunur — «məndə işləyir» problemlərinin böyük hissəsi bununla bitir.\n\n[[semver]] işarələrini anla: ^ minor yeniləməyə icazə verir. CI-da npm ci istifadə et — lock faylına tam sadiq quraşdırma aparır. dependencies ilə devDependencies fərqini düzgün saxla.",
  terms:["semantic-versioning"]},
 {t:"Monorepo, workspace və mühit konfiqurasiyası",lvl:"m",body:"[[monorepo]] bir neçə tətbiq və ortaq paketi (UI kit, tiplər, utils) eyni repoda saxlayır; [[workspace]] onları əlaqələndirir. Turborepo/Nx build keşi ilə vaxt qazandırır.\n\n[[env-variable]] idarəsində qayda: .env.example repoda olsun, real dəyərlər olmasın. Mühitlər (dev/test/prod) arasında fərqi konfiqurasiya ilə həll et, kod içində şərtlə yox.",
  terms:["build-artifact"]},
 {t:"Debugging, source map və editor qurğusu",lvl:"jp",body:"[[source-map]] minifikasiya olunmuş production kodunu orijinal sətirlərə bağlayır — xəta monitorinqi üçün mütləqdir.\n\nVS Code-da debugger ilə [[breakpoint]] qoymaq, [[devtools]]-da conditional breakpoint istifadə etmək və React DevTools-da komponent ağacına baxmaq — bu üçlük gündəlik iş sürətini ciddi artırır.",
  terms:["sentry"]}
]},

{id:"sec",name:"Frontend təhlükəsizliyi",lvl:"m",
 sum:"Frontend təhlükəsizliyin son həlqəsi deyil, amma ilk qapısıdır. Bu mövzular müsahibədə middle səviyyəni ayırır.",
 goal:"İstifadəçi məzmunu, token saxlanması və asılılıqlar üzrə riskləri tanımaq və düzgün müdafiəni seçmək.",
 topics:[
 {t:"XSS və istifadəçi məzmununun təhlükəsiz göstərilməsi",lvl:"m",body:"[[xss]] zərərli skriptin sənin səhifəndə icra olunmasıdır. React default olaraq mətn kimi escape edir — əsas risk [[dangerously-set-html]] və ya innerHTML istifadəsidir.\n\nZəngin mətn (rich text) göstərmək lazımdırsa, [[sanitization]] tətbiq et (DOMPurify). URL-ləri də yoxla: javascript: sxemi ilə link təhlükəlidir. Ən güclü əlavə qat [[csp]] başlığıdır — icazəli skript mənbələrini məhdudlaşdırır.",
  terms:["csp"]},
 {t:"CSRF, cookie parametrləri və CSP",lvl:"m",body:"[[csrf]] hücumunda istifadəçinin cookie-si ilə onun adından sorğu göndərilir. Müdafiə: [[same-site-cookie]] parametri (Lax/Strict) və CSRF token.\n\n[[csp]] siyasəti inline skriptləri və naməlum mənbələri bloklayır; düzgün qurulanda XSS-in təsirini kəskin azaldır. Bu başlıqlar serverdə və ya hosting konfiqurasiyasında verilir — frontend developer olaraq nə lazım olduğunu deyə bilməlisən.",
  terms:["http-header"]},
 {t:"Token saxlanması və autentifikasiya axını",lvl:"m",body:"Token-i localStorage-də saxlamaq rahat, lakin [[xss]] baş verərsə oğurlanandır. Daha təhlükəsiz variant [[http-only-cookie]]-dir, çünki JS onu oxuya bilmir.\n\n[[jwt]] məzmunu açıq oxunandır — icazə qərarlarını yalnız ona güvənib frontenddə vermək olmaz; UI gizlətmək təhlükəsizlik deyil, server hər sorğuda yoxlamalıdır. [[refresh-token]] axınını mərkəzi interceptor-da bir dəfə qur.",
  terms:["oauth"]},
 {t:"Asılılıqlar və tədarük zənciri riski",lvl:"m",body:"[[supply-chain]] hücumları paket vasitəsilə gəlir. Yeni paket əlavə etməzdən əvvəl bax: nə qədər istifadə olunur, dəstəklənirmi, ölçüsü nədir, həqiqətən lazımdırmı.\n\n[[npm-audit]] məlum zəiflikləri göstərir, [[dependabot]]/Renovate isə yeniləmələr üçün avtomatik PR açır. Lock faylı və CI-da npm ci gözlənilməz versiya dəyişikliyinin qarşısını alır.",
  terms:["lock-file"]}
]},

{id:"arch",name:"Arxitektura, kod keyfiyyəti və middle səviyyəyə keçid",lvl:"m",
 sum:"Bu yol texnologiya deyil, qərar vermək haqqındadır. Middle-i junior-dan ayıran şey kodun özü yox, seçimin səbəbidir.",
 goal:"Böyüyən layihəni idarə edilə bilən saxlamaq və qərarlarını trade-off dili ilə izah etmək.",
 topics:[
 {t:"Qovluq strukturu və feature-based arxitektura",lvl:"m",body:"Kiçik layihədə components/hooks/utils bölgüsü işləyir, böyüdükcə dağılır. [[feature-folder]] yanaşmasında qovluqlar iş sahəsinə görə bölünür: orders/, billing/, inventory/ — hər biri öz komponenti, hook-u, tipi və API qatı ilə.\n\n[[layered-architecture]] daxildə qalır: UI komponenti → hook/service → API client. [[barrel-file]] rahatdır, lakin hər qovluğa index.ts qoymaq build-i yavaşladır və dairəvi import riski yaradır — ölçülü istifadə et.",
  note:"Praktik test: yeni feature əlavə edəndə neçə fərqli qovluğa toxunursan? Cavab çoxdursa, struktur texnologiyaya görə bölünüb."},
 {t:"Təkrar istifadə: dizayn sistemi və komponent kitabxanası",lvl:"m",body:"[[design-system]] token + komponent + qaydadır. DevExtreme kimi hazır kitabxana üzərində öz nazik wrapper qatını qurmaq (öz Button, öz DataGrid preset-i) gələcəkdə həm stil, həm davranış dəyişikliyini bir yerdən idarə etməyə imkan verir.\n\n[[headless-component]] yanaşması məntiqlə stili ayırır. [[storybook]] isə komponenti təcrid olunmuş inkişaf etdirməyə və komanda üçün sənədləşdirməyə xidmət edir.",
  terms:["design-token"]},
 {t:"Kod keyfiyyəti: SOLID, DRY və refaktorinq",lvl:"m",body:"Frontenddə [[solid]]-dən ən çox işə yarayanı tək məsuliyyət prinsipidir: komponent həm data çəkib, həm formatlayıb, həm də render edirsə — bölünməlidir.\n\n[[dry]] balansı vacibdir: erkən abstraksiya səhv abstraksiyadan pisdir, üçüncü təkrardan sonra ümumiləşdir. [[refactoring]] testsiz risklidir — ona görə Testing yolu bu yoldan əvvəl gəlir. [[technical-debt]] şüurlu alınır və qeyd olunur, gizlədilmir.",
  terms:["integration-test"]},
 {t:"Junior → Middle fərqi və müsahibə hazırlığı",lvl:"m",body:"Middle-dən gözlənilən: tapşırığı özü hissələrə bölmək, [[estimation]] verə bilmək, riski əvvəlcədən bildirmək və qərarın [[trade-off]]-unu izah etmək.\n\n[[system-design]] sualında gözlənilən cavab strukturu: tələbləri aydınlaşdır → data axınını çək → komponent bölgüsünü göstər → keş və vəziyyət hallarını (loading/xəta/boş) danış → performans və əlçatanlıq qərarlarını əlavə et. «Niyə belə?» sualına hazır cavabın olması texniki biliyin özü qədər dəyərlidir.",
  note:"Aktiv təkrar: öyrəndiyin hər mövzunu 2 dəqiqəyə, junior müsahibəsində izah edirmiş kimi öz sözlərinlə danış. Deyə bilmirsənsə, hələ bilmirsən."},
 {t:"Real məhsul tələbləri: i18n, monitorinq, feature flag",lvl:"m",body:"Real sistemdə koddan başqa tələblər də var. [[i18n]] yalnız mətn tərcüməsi deyil — tarix, valyuta, rəqəm formatı və mətn uzunluğunun layouta təsiri.\n\n[[sentry]] kimi xəta monitorinqi production-da nəyin sındığını source map ilə göstərir; onsuz istifadəçi şikayətinə güvənmək məcburiyyətindəsən. [[feature-flag]] isə kodu deploy edib funksiyanı sonra açmağa imkan verir — riskli buraxılışları idarə etməyin standart yoludur.",
  terms:["source-map"]}
]}
];

export const TOPIC_COUNT = PATHS.reduce((n, p) => n + p.topics.length, 0);

export function getPath(id: string): LearningPath | undefined {
  return PATHS.find((p) => p.id === id);
}

export function pathIndex(id: string): number {
  return PATHS.findIndex((p) => p.id === id);
}
