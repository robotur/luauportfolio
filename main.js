(() => {
  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /* ───────── text from config ───────── */
  document.title = `${S.name}, Roblox scripter`;
  $("#bar-title").textContent = S.barTitle || `${S.name}’s dev portfolio`;
  $("#name").textContent = S.name;
  $("#bio").textContent = S.bio;
  $("#tagline").textContent = S.tagline;
  if (S.status) $("#status").textContent = S.status; else $(".status").hidden = true;
  const list = $("#services");
  (S.services || []).forEach((s) => { const li = document.createElement("li"); li.textContent = s; list.append(li); });
  $("#city").textContent = S.place.city + ", " + S.place.country;
  $("#utc").textContent = S.place.utc;
  $("#copyright").textContent = `© ${new Date().getFullYear()} ${S.name}`;
  $("#discord-foot").textContent = `Discord ${S.discord.handle}`;

  /* bottom links */
  const addLi = (ul, text, href) => {
    const li = document.createElement("li");
    if (href) { const a = document.createElement("a"); a.href = href; a.textContent = text; li.append(a); }
    else li.textContent = text;
    ul.append(li);
  };
  S.clips.forEach((c) => addLi($("#sf-work"), c.title, "#hero"));
  (S.services || []).forEach((s) => addLi($("#sf-services"), s));
  if (S.status) addLi($("#sf-info"), S.status);
  addLi($("#sf-info"), `${S.place.city}, ${S.place.country}`);
  addLi($("#sf-info"), S.place.utc);

  /* ───────── the boxes ───────── */
  const band = $("#band");
  const tiles = S.clips.map((c) => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "tile";
    el.setAttribute("role", "listitem");
    el.setAttribute("aria-label", `Play ${c.title}`);

    const video = document.createElement("video");
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto"; // loaded up front so a click plays at once
    video.disablePictureInPicture = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    if (c.poster) video.poster = c.poster;
    video.src = c.src + "#t=0.1"; // shows a still frame until played

    const ph = document.createElement("span");
    ph.className = "ph";
    ph.textContent = c.src;

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = c.title;

    el.append(video, ph, title);
    band.append(el);

    video.addEventListener("error", () => el.classList.add("is-empty"));
    video.addEventListener("loadeddata", () => el.classList.remove("is-empty"));
    video.addEventListener("play", () => el.classList.add("is-playing"));
    video.addEventListener("pause", () => el.classList.remove("is-playing"));

    return { el, video };
  });

  const play = (v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };

  tiles.forEach((t) => {
    t.el.addEventListener("click", () => {
      if (t.video.paused) {
        tiles.forEach((o) => { if (o !== t) o.video.pause(); });
        play(t.video);
      } else {
        t.video.pause();
      }
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) tiles.forEach((t) => t.video.pause());
  });

  /* ───────── scroll: the boxes rise to the middle, the text fades ───────── */
  const hero = $("#hero");
  const pin = $(".stick", hero);
  const intro = $("#intro");
  let shown = 0;
  let goal = 0;
  let raf = 0;

  function measureGoal() {
    const travel = Math.max(1, hero.offsetHeight - pin.offsetHeight);
    goal = clamp(window.scrollY / travel, 0, 1);
  }
  function paint() {
    hero.style.setProperty("--p", shown.toFixed(4));
    intro.classList.toggle("is-gone", shown > 0.7);
  }
  function loop() {
    shown += (goal - shown) * (reduce ? 1 : 0.16);
    if (Math.abs(goal - shown) < 0.0006) shown = goal;
    paint();
    raf = shown === goal ? 0 : requestAnimationFrame(loop);
  }
  const onScroll = () => { measureGoal(); if (!raf) raf = requestAnimationFrame(loop); };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  measureGoal();
  shown = goal; // if the page loads already scrolled
  paint();

  /* ───────── contact ───────── */
  const link = $("#discord-link");
  link.href = `https://discord.com/users/${S.discord.id}`;

  const copyBtn = $("#copy");
  copyBtn.textContent = `Copy ${S.discord.handle}`;
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(S.discord.handle);
    } catch {
      const t = document.createElement("textarea");
      t.value = S.discord.handle;
      t.style.position = "fixed"; t.style.opacity = "0";
      document.body.append(t); t.select();
      try { document.execCommand("copy"); } catch {}
      t.remove();
    }
    copyBtn.textContent = "Copied";
    setTimeout(() => (copyBtn.textContent = `Copy ${S.discord.handle}`), 1600);
  });

  /* local time */
  const timeEl = $("#time");
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: S.place.timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  });
  const clock = () => { timeEl.textContent = fmt.format(new Date()); };
  clock();
  setInterval(clock, 10000);
})();
