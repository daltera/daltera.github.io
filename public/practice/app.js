// ======= Elements
const el = (id) => document.getElementById(id);
const stateStart = el('state-start');
const statePrepare = el('state-prepare');
const stateRecording = el('state-recording');
const stateEval = el('state-eval');

const btnStart = el('btnStart');
const btnRetry = el('btnRetry');

const promptText = el('promptText');
const promptEcho = el('promptEcho');
const evalPrompt = el('evalPrompt');

const prepareTimer = el('prepareTimer');
const recordTimer = el('recordTimer');

const prepareBar = el('prepareBar');
const recordBar = el('recordBar');

const liveRegion = el('liveRegion');

// ======= Config
const PREP_SECONDS = 15;
const RECORD_SECONDS = 45; // keep your value
const TOTAL_SECONDS = PREP_SECONDS + RECORD_SECONDS;
// Detect mobile (good-enough heuristic)
const MOBILE_COMPAT = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
const PROMPTS = [
    "Some people prefer spending their free time outdoors, exploring nature and being active. Others enjoy staying indoors, relaxing with books or movies. Which do you think is better? Explain why.",
    "Some people like to plan everything in advance, while others prefer to be spontaneous and flexible. Which approach do you think is more effective? Explain why.",
    "Some people enjoy living in a busy city with many opportunities, while others prefer a quiet town or village. Which lifestyle do you think is better? Explain why.",
    "Some people think it’s important to focus on career success, while others believe personal happiness is more important. Which do you think matters more? Explain why.",
    "Some people like to try new foods and experiences, while others prefer familiar routines. Which approach do you think is better? Explain why.",
    "Some people prefer warm weather, while others enjoy cold climates. Which do you think is more comfortable? Explain why.",
    "Some people enjoy rainy days, while others prefer dry, sunny days. Which do you think is better? Explain why.",
    "Some people prefer spring, while others like fall. Which season do you enjoy more? Explain why.",
    "Some people like snow and winter sports, while others prefer hot weather and outdoor summer activities. Which do you think is better? Explain why.",
    "Some people enjoy savory foods, while others prefer sweet foods. Which type of taste do you enjoy more? Explain why.",
    "Some students learn better by listening to lectures, while others learn better by reading or visual aids. Which method do you think is more effective? Explain why.",
    "Some students prefer attending live lectures, while others prefer asynchronous online classes. Which approach do you think is better? Explain why.",
    "Some people prefer traveling by public transport, while others like private vehicles. Which mode do you prefer? Explain why.",
    "Some people like biking or using two-wheelers, while others prefer cars or four-wheelers. Which do you think is more convenient? Explain why.",
    "Some people prefer using smartphones for most tasks, while others prefer basic phones or limited technology. Which do you think is better? Explain why.",
    "Some people prefer studying math and sciences, while others enjoy languages or arts. Which do you prefer? Explain why.",
    "Some students enjoy physics or biology, while others like chemistry or environmental science. Which subjects do you prefer? Explain why.",
    "Some people enjoy drawing, painting, or arts, while others prefer writing, reading, or composing stories. Which do you prefer? Explain why.",
    "Some people enjoy swimming in pools, while others prefer lakes or oceans. Which do you prefer? Explain why.",
    "Some people like attending concerts, while others prefer visiting museums. Which do you enjoy more? Explain why.",
    "Some people enjoy watching movies at home, while others prefer cinemas. Which do you prefer? Explain why.",
    "Some people prefer reading fiction books, while others enjoy non-fiction. Which do you prefer? Explain why.",
    "Some people like spicy foods, while others prefer mild flavors. Which do you enjoy more? Explain why.",
    "Some people enjoy social media, while others prefer offline hobbies. Which do you think is better? Explain why.",
    "Some people like planning vacations in advance, while others prefer spontaneous trips. Which approach do you prefer? Explain why.",
    "Some people enjoy long vacations, while others prefer weekend getaways. Which do you prefer? Explain why.",
    "Some people like reading newspapers, while others prefer online news. Which do you prefer? Explain why.",
    "Some people enjoy baking, while others prefer cooking main meals. Which do you enjoy more? Explain why.",
    "Some people enjoy traveling alone, while others prefer traveling with friends or family. Which do you prefer? Explain why.",
    "Some people prefer using cash, while others prefer digital payments. Which do you think is better? Explain why.",
    "Some people enjoy listening to music while studying, while others prefer silence. Which do you prefer? Explain why.",
    "Some people prefer dogs as pets, while others prefer cats. Which do you prefer? Explain why.",
    "Some people enjoy exercising at home, while others prefer public gyms. Which do you prefer? Explain why.",
    "Some people like hiking in nature, while others prefer city walks or jogging. Which do you prefer? Explain why.",
    "Some people enjoy winter sports, while others prefer summer sports. Which do you enjoy more? Explain why.",
    "Some people prefer attending parties, while others enjoy quiet evenings. Which do you prefer? Explain why.",
    "Some people like participating in competitions, while others avoid them. Which do you think is better? Explain why.",
    "Some people enjoy fast-paced city life, while others prefer calm rural living. Which lifestyle do you prefer? Explain why.",
    "Some people enjoy watching sports live, while others prefer TV or online streaming. Which do you prefer? Explain why.",
    "Some people like learning through interactive activities, while others prefer lectures. Which do you prefer? Explain why.",
    "Some people enjoy spending money on experiences, while others prefer saving for the future. Which do you prefer? Explain why.",
    "Some people enjoy solo travel, while others prefer group travel. Which do you prefer? Explain why.",
    "Some people like attending cultural events, while others prefer outdoor sports. Which do you enjoy more? Explain why.",
    "Some people enjoy arts and crafts, while others prefer technology-based hobbies. Which do you prefer? Explain why.",
    "Some people prefer early mornings, while others prefer late nights for working or studying. Which time do you prefer? Explain why.",
    "Some people enjoy writing essays or stories, while others prefer reading and analyzing them. Which do you prefer? Explain why.",
    "Some people like eating at restaurants, while others prefer home-cooked meals. Which do you prefer? Explain why.",
    "Some people prefer online meetings, while others enjoy in-person interactions. Which do you prefer? Explain why.",
    "Some people like action movies, while others prefer comedy or romance. Which do you prefer? Explain why.",
    "Some people enjoy listening to podcasts, while others like reading articles. Which do you prefer? Explain why.",
    "Some people like biking, while others prefer walking for exercise. Which do you prefer? Explain why.",
    "Some people enjoy listening to classical music, while others prefer pop or rock. Which do you prefer? Explain why.",
    "Some people enjoy solo activities, while others prefer team activities. Which do you enjoy more? Explain why.",
    "Some people enjoy hiking, while others prefer cycling. Which do you enjoy more? Explain why.",
    "Some people enjoy beach vacations, while others prefer mountain retreats. Which do you prefer? Explain why.",
    "Some people prefer tea, while others enjoy coffee. Which do you prefer? Explain why.",
    "Some people enjoy short trips, while others like long vacations. Which do you prefer? Explain why.",
    "Some people enjoy fast food, while others prefer healthy meals. Which do you prefer? Explain why.",
    "Some people enjoy cooking, while others prefer baking. Which do you prefer? Explain why.",
    "Some people like city life, while others prefer rural living. Which lifestyle do you prefer? Explain why.",
    "Some people enjoy attending live events, while others enjoy online events. Which do you prefer? Explain why.",
    "Some people prefer living in apartments, while others prefer owning a house. Which do you think is better? Explain why.",
    "Some people hire service people for home repairs, while others prefer to do it themselves. Which approach do you prefer? Explain why.",
    "Some people enjoy having a home gym, while others prefer a home movie theater. Which would you choose? Explain why.",
    "Some people prefer watching movies at home, while others enjoy going out to the movies. Which do you prefer? Explain why.",
    "Some people prefer streaming movies online, while others like watching traditional cinema. Which do you enjoy more? Explain why.",
    "Some people prefer sleeping on beds, while others enjoy futons. Which do you prefer? Explain why.",
    "Some people like using couches, while others prefer recliners. Which do you enjoy more? Explain why.",
    "Some people prefer watching TV, while others enjoy using an iPad or tablet. Which do you prefer? Explain why.",
    "Some people use wooden utensils for cooking, while others prefer metal utensils. Which do you think is better? Explain why.",
    "Some people eat with chopsticks, while others prefer forks. Which do you prefer? Explain why.",
    "Some people like open-plan living spaces, while others prefer separate rooms. Which do you enjoy more? Explain why.",
    "Some people prefer small, cozy homes, while others like large, spacious houses. Which do you prefer? Explain why.",
    "Some people enjoy living in modern-style homes, while others prefer traditional designs. Which do you prefer? Explain why.",
    "Some people prefer hardwood floors, while others like carpeted floors. Which do you think is better? Explain why.",
    "Some people enjoy having a balcony or terrace, while others prefer a garden. Which do you prefer? Explain why.",
    "Some people like minimalistic interior design, while others enjoy elaborate decorations. Which do you prefer? Explain why.",
    "Some people prefer shared apartments with roommates, while others enjoy living alone. Which do you prefer? Explain why.",
    "Some people enjoy having smart home devices, while others prefer simpler homes without technology. Which do you prefer? Explain why.",
    "Some people like central heating, while others prefer portable heaters. Which do you prefer? Explain why.",
    "Some people enjoy air-conditioned homes, while others prefer natural ventilation. Which do you prefer? Explain why.",
    "Some people like a home office, while others work in cafes or co-working spaces. Which do you prefer? Explain why.",
    "Some people enjoy having multiple bathrooms, while others think one bathroom is enough. Which do you prefer? Explain why.",
    "Some people enjoy a fireplace, while others don’t care about it. Which do you think is better? Explain why.",
    "Some people like home libraries or bookshelves, while others don’t have them. Which do you prefer? Explain why.",
    "Some people enjoy indoor plants, while others prefer a plant-free home. Which do you prefer? Explain why.",
    "Some people prefer white walls, while others like colorful painted walls. Which do you prefer? Explain why.",
    "Some people enjoy patterned wallpaper, while others prefer plain walls. Which do you prefer? Explain why.",
    "Some people like having a dishwasher, while others prefer washing dishes by hand. Which do you prefer? Explain why.",
    "Some people enjoy doing laundry themselves, while others hire laundry services. Which approach do you prefer? Explain why.",
    "Some people prefer a home theater system, while others enjoy just a basic TV setup. Which do you prefer? Explain why.",
    "Some people like rugs in their home, while others prefer bare floors. Which do you prefer? Explain why.",
    "Some people enjoy a home bar, while others prefer not having one. Which do you prefer? Explain why.",
    "Some people prefer a bathtub, while others like showers. Which do you prefer? Explain why.",
    "Some people like a large kitchen, while others prefer a compact kitchen. Which do you prefer? Explain why.",
    "Some people enjoy cooking in an open kitchen, while others like closed kitchens. Which do you prefer? Explain why.",
    "Some people prefer a dining table in the kitchen, while others prefer a separate dining room. Which do you prefer? Explain why.",
    "Some people prefer single-level homes, while others enjoy multi-story houses. Which do you prefer? Explain why.",
    "Some people enjoy having a walk-in closet, while others are fine with smaller storage spaces. Which do you prefer? Explain why.",
    "Some people prefer large windows, while others like smaller, cozier windows. Which do you prefer? Explain why.",
    "Some people enjoy skylights, while others think they are unnecessary. Which do you prefer? Explain why.",
    "Some people like ceiling fans, while others prefer air conditioning. Which do you prefer? Explain why.",
    "Some people enjoy heated floors, while others don’t see the need. Which do you prefer? Explain why.",
    "Some people like having a home gym with machines, while others prefer free weights. Which do you prefer? Explain why.",
    "Some people enjoy a dedicated gaming room, while others prefer gaming in the living room. Which do you prefer? Explain why.",
    "Some people prefer installing a security system, while others rely on basic locks. Which do you prefer? Explain why.",
    "Some people enjoy smart lighting systems, while others use normal light switches. Which do you prefer? Explain why.",
    "Some people like curtains, while others prefer blinds or shades. Which do you prefer? Explain why.",
    "Some people enjoy wall-mounted TVs, while others prefer TVs on stands. Which do you prefer? Explain why.",
    "Some people prefer standing desks, while others like traditional desks. Which do you prefer? Explain why.",
    "Some people like having a study nook, while others work in shared spaces at home. Which do you prefer? Explain why.",
    "Some people enjoy home workshops or DIY spaces, while others don’t need them. Which do you prefer? Explain why.",
    "Some people like hardwood cabinets, while others prefer metal or laminate. Which do you prefer? Explain why.",
    "Some people enjoy indoor fireplaces, while others prefer outdoor fire pits. Which do you prefer? Explain why.",
    "Some people enjoy breakfast nooks, while others don’t think they are necessary. Which do you prefer? Explain why.",
    "Some people prefer traditional furniture, while others like modern designs. Which do you prefer? Explain why.",
    "Some people enjoy a home studio for music or art, while others don’t need one. Which do you prefer? Explain why.",
    "Some people enjoy built-in bookshelves, while others prefer movable ones. Which do you prefer? Explain why.",
    "Some people prefer single beds, while others like bunk beds. Which do you prefer? Explain why.",
    "Some people enjoy futons for living room seating, while others prefer sofas. Which do you prefer? Explain why.",
    "Some people enjoy ottomans or poufs, while others don’t use them. Which do you prefer? Explain why.",
    "Some people enjoy large refrigerators, while others are fine with smaller ones. Which do you prefer? Explain why.",
    "Some people prefer gas stoves, while others like electric stoves. Which do you prefer? Explain why.",
    "Some people enjoy microwaves for cooking, while others avoid them. Which do you prefer? Explain why.",
    "Some people like home coffee machines, while others prefer instant coffee. Which do you prefer? Explain why.",
    "Some people enjoy home delivery services for groceries, while others shop in-store. Which do you prefer? Explain why.",
    "Some people enjoy home cleaning robots, while others clean manually. Which do you prefer? Explain why.",
    "Some people prefer smart locks, while others stick to traditional keys. Which do you prefer? Explain why.",
    "Some people like large mirrors in the house, while others avoid them. Which do you prefer? Explain why.",
    "Some people enjoy wine fridges or mini bars, while others don’t use them. Which do you prefer? Explain why.",
    "Some people like LED lighting, while others prefer natural light. Which do you prefer? Explain why.",
    "Some people enjoy chandeliers, while others prefer simple light fixtures. Which do you prefer? Explain why.",
    "Some people enjoy balconies, while others prefer gardens or patios. Which do you prefer? Explain why.",
    "Some people like floor-to-ceiling windows, while others prefer smaller, cozier ones. Which do you prefer? Explain why.",
    "Some people prefer cooking rice in a rice cooker, while others use a stove top. Which do you prefer? Explain why.",
    "Some people enjoy baked food, while others prefer grilled food. Which do you prefer? Explain why.",
    "Some people like steamed food, while others enjoy fried food. Which do you prefer? Explain why.",
    "Some people prefer fast food, while others enjoy casual dining. Which do you prefer? Explain why.",
    "Some people like homemade meals, while others prefer readymade or packaged meals. Which do you prefer? Explain why.",
    "Some people enjoy pizza with fish, while others prefer pizza with corn. Which do you prefer? Explain why.",
    "Some people prefer cooking with a microwave, while others use an oven. Which do you prefer? Explain why.",
    "Some people enjoy ice cream, while others prefer popsicles. Which do you prefer? Explain why.",
    "Some people prefer cooking with garlic, while others like using onion. Which do you prefer? Explain why.",
    "Some people like vegetarian meals, while others prefer meat-based meals. Which do you prefer? Explain why.",
    "Some people enjoy spicy food, while others prefer mild flavors. Which do you prefer? Explain why.",
    "Some people prefer eating breakfast at home, while others eat out. Which do you prefer? Explain why.",
    "Some people enjoy sweet snacks, while others prefer savory snacks. Which do you prefer? Explain why.",
    "Some people prefer cooking with fresh ingredients, while others use frozen or preserved items. Which do you prefer? Explain why.",
    "Some people like eating homemade bread, while others prefer store-bought bread. Which do you prefer? Explain why.",
    "Some people enjoy drinking tea, while others prefer coffee. Which do you prefer? Explain why.",
    "Some people like smoothies, while others prefer fruit juices. Which do you prefer? Explain why.",
    "Some people enjoy grilling meat outdoors, while others prefer indoor cooking. Which do you prefer? Explain why.",
    "Some people prefer traditional recipes, while others like experimenting with fusion dishes. Which do you prefer? Explain why.",
    "Some people enjoy cooking with oil, while others prefer baking or steaming. Which do you prefer? Explain why.",
    "Some people like cooking pasta, while others prefer rice dishes. Which do you prefer? Explain why.",
    "Some people enjoy eating sushi, while others prefer sandwiches. Which do you prefer? Explain why.",
    "Some people prefer cooking at home, while others enjoy dining out. Which do you prefer? Explain why.",
    "Some people enjoy adding herbs to dishes, while others prefer spices. Which do you prefer? Explain why.",
    "Some people like using butter for cooking, while others use oil or margarine. Which do you prefer? Explain why.",
    "Some people prefer stir-fried dishes, while others enjoy roasted or baked dishes. Which do you prefer? Explain why.",
    "Some people like breakfast cereals, while others prefer eggs and toast. Which do you prefer? Explain why.",
    "Some people enjoy eating cold meals, while others like hot meals. Which do you prefer? Explain why.",
    "Some people enjoy pancakes, while others prefer waffles. Which do you prefer? Explain why.",
    "Some people prefer smoothies with dairy, while others like plant-based options. Which do you prefer? Explain why.",
    "Some people enjoy eating frozen meals, while others prefer fresh-cooked meals. Which do you prefer? Explain why.",
    "Some people enjoy casual dining, while others prefer fine dining. Which do you prefer? Explain why.",
    "Some people like making desserts at home, while others buy them ready-made. Which do you prefer? Explain why.",
    "Some people enjoy eating noodles, while others prefer rice-based meals. Which do you prefer? Explain why.",
    "Some people like cooking with eggs, while others prefer tofu or legumes. Which do you prefer? Explain why.",
    "Some people prefer homemade drinks, while others buy ready-made beverages. Which do you prefer? Explain why.",
    "Some people enjoy eating fruit as snacks, while others prefer nuts or savory snacks. Which do you prefer? Explain why.",
    "Some people prefer eating small meals throughout the day, while others prefer three main meals. Which do you prefer? Explain why.",
    "Some people like spicy sauces, while others prefer mild or sweet sauces. Which do you prefer? Explain why.",
    "Some people enjoy grilled vegetables, while others prefer raw salads. Which do you prefer? Explain why.",
    "Some people prefer eating meat, while others prefer plant-based proteins. Which do you prefer? Explain why.",
    "Some people enjoy cooking with seafood, while others prefer meat or vegetarian dishes. Which do you prefer? Explain why.",
    "Some people like cooking traditional dishes, while others enjoy modern recipes. Which do you prefer? Explain why.",
    "Some people enjoy food delivery services, while others cook at home. Which do you prefer? Explain why.",
    "Some people like using ceramic cookware, while others prefer metal or non-stick. Which do you prefer? Explain why.",
    "Some people enjoy homemade pizza, while others enjoy frozen pizza. Which do you prefer? Explain why.",
    "Some people enjoy eating soups, while others prefer solid meals. Which do you prefer? Explain why.",
    "Some people like spicy stir-fries, while others prefer mild stews. Which do you prefer? Explain why.",
    "Some people prefer eating out for dinner, while others cook at home. Which do you prefer? Explain why.",
    "Some people enjoy making desserts, while others prefer preparing main courses. Which do you prefer? Explain why.",
    "Some people like adding sugar to food, while others avoid it. Which do you prefer? Explain why.",
    "Some people enjoy sweet desserts, while others prefer savory desserts. Which do you prefer? Explain why.",
    "Some people prefer eating homemade sandwiches, while others buy them from stores. Which do you prefer? Explain why."
];
// ======= State
let totalInterval = null;
let transcriptFinal = "", transcriptInterim = "";
let recordingAllowed = false;   // flips true at t >= 15s

// MediaRecorder state
let stream = null;
let mediaRecorder = null;
let mediaChunks = [];
let headerChunk = null;            // <-- NEW: keep the first init chunk
let mediaBlob = null;
let mediaBlobUrl = null;

// Keep prompt until onstop
let currentPromptRef = null;

// ======= Single SpeechRecognition instance
const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
const recognition = SR ? new SR() : null;

if (recognition) {
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
        if (!recordingAllowed) return; // ignore first 15s
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
            const res = e.results[i];
            if (res.isFinal) transcriptFinal += res[0].transcript + " ";
            else interim += res[0].transcript;
        }
        transcriptInterim = interim;
    };

    recognition.onerror = (e) => {
        // Ignore harmless errors when not actively recording
        if (e.error === "no-speech" || e.error === "audio-capture" || e.error === "aborted") {
            alert("[SR] Active error:", e.error);
            try { recognition.start(); } catch { }
            return;
        }
        alert("[SR] Active error:", e.error);
    };
}

// ======= Helpers
function setState(view) {
    [stateStart, statePrepare, stateRecording, stateEval].forEach(s => s.hidden = true);
    view.hidden = false;
    liveRegion.textContent =
        view === statePrepare ? "Prepare to speak." :
            view === stateRecording ? "Recording started." :
                view === stateEval ? "Evaluation displayed." :
                    "Ready to begin.";
}
function formatMMSS(t) {
    const m = Math.floor(t / 60), s = t % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function pickPrompt() { return PROMPTS[Math.floor(Math.random() * PROMPTS.length)]; }
function resetBars() { prepareBar.style.width = "0%"; recordBar.style.width = "0%"; }
function cleanupMedia() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        try { mediaRecorder.stop(); } catch { }
    }
    if (stream) {
        stream.getTracks().forEach(t => t.stop());
        stream = null;
    }
    mediaRecorder = null;
    mediaChunks = [];
    headerChunk = null;                     // <-- reset header
    if (mediaBlobUrl) URL.revokeObjectURL(mediaBlobUrl);
    mediaBlob = null;
    mediaBlobUrl = null;
}

// Wait for user consent using THIS recognition instance
function waitForConsent() {
    return new Promise(resolve => {
        if (!recognition) return resolve(false);
        let resolved = false, started = false;
        const pStart = recognition.onstart, pErr = recognition.onerror, pEnd = recognition.onend;

        recognition.onstart = () => {
            started = true;
            if (!resolved) {
                resolved = true;
                recognition.onstart = pStart; recognition.onerror = pErr; recognition.onend = pEnd;
                resolve(true);
            }
        };
        recognition.onerror = (e) => {
            if (!resolved) {
                resolved = true;
                recognition.onstart = pStart; recognition.onerror = pErr; recognition.onend = pEnd;
                resolve(false);
            }
        };
        recognition.onend = () => {
            if (!resolved && !started) {
                resolved = true;
                recognition.onstart = pStart; recognition.onerror = pErr; recognition.onend = pEnd;
                resolve(false);
            }
        };

        try { recognition.start(); } catch { resolve(false); }
    });
}

// ======= Flow
async function begin() {
    if (!recognition) {
        alert("SpeechRecognition not supported. Use Chrome over HTTPS or localhost.");
        return;
    }

    // Reset session
    clearInterval(totalInterval);
    cleanupMedia();
    transcriptFinal = ""; transcriptInterim = "";
    recordingAllowed = false;

    // 1) Ask for mic and WAIT for decision — this calls recognition.start() internally
    const granted = await waitForConsent();
    if (!granted) {
        alert("Microphone permission denied.");
        try { recognition.stop(); } catch { }
        return;
    }

    // 2) Immediately start MediaRecorder (runs during prep; we'll skip early audio)
    if (!MOBILE_COMPAT) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // MIME selection with safe fallbacks
            let chosen;
            if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported) {
                if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) chosen = "audio/webm;codecs=opus";
                else if (MediaRecorder.isTypeSupported("audio/webm")) chosen = "audio/webm";
                else if (MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")) chosen = "audio/ogg;codecs=opus";
            }
            mediaRecorder = new MediaRecorder(stream, chosen ? { mimeType: chosen } : undefined);

            mediaChunks = [];
            headerChunk = null; // ensure cleared

            // Keep the very first chunk as header; only append later chunks after 15s
            mediaRecorder.ondataavailable = (e) => {
                if (!e.data || !e.data.size) return;
                if (!headerChunk) {
                    headerChunk = e.data;           // <-- capture initialization segment
                    return;
                }
                if (recordingAllowed) {
                    mediaChunks.push(e.data);       // <-- only collect after 15s
                }
            };

            mediaRecorder.onstop = () => {
                const type = mediaRecorder.mimeType || "audio/webm";
                const parts = headerChunk ? [headerChunk, ...mediaChunks] : mediaChunks; // keep header first
                mediaBlob = new Blob(parts, { type });
                mediaBlobUrl = URL.createObjectURL(mediaBlob);

                // release mic tracks
                stream.getTracks().forEach(t => t.stop());

                // Signal that media is ready
                if (typeof mediaBlobReadyResolve === 'function') {
                    const resolver = mediaBlobReadyResolve;
                    mediaBlobReadyResolve = null;
                    resolver(mediaBlob);
                }
            };


            // Use 1s slices so we can filter out the first 15s cleanly
            mediaRecorder.start(1000);
        } catch (err) {
            alert("getUserMedia/MediaRecorder error:", err);
        }
    }

    // 3) Show the 15s prep UI (SR + MR already running)
    const nextPrompt = pickPrompt();
    currentPromptRef = nextPrompt;
    runSession(nextPrompt);
}

async function fetchEvaluationFromAPI(prompt, transcript) {
    try {
        const res = await fetch("https://speech-scoring.vercel.app/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt_topic: prompt,
                response_text: transcript
            })
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Expecting shape: { scores: [{ trait, score, explanation }, ...] }
        if (!data || !Array.isArray(data.scores)) throw new Error("Malformed response");
        return data.scores;
    } catch (err) {
        console.error("Backend error:", err);
        return null; // let UI show a graceful fallback
    }
}

// Loading overlay helpers
const loadingOverlay = document.getElementById('loadingOverlay');
function showLoading(isOn) { if (!loadingOverlay) return; loadingOverlay.hidden = !isOn; }

// Promise that resolves once mediaBlob is ready (or immediately if it already is)
let mediaBlobReadyResolve = null;
function waitForMediaBlobOnce() {
    return new Promise((resolve) => {
        if (mediaBlob) return resolve(mediaBlob);
        mediaBlobReadyResolve = resolve; // resolved inside mediaRecorder.onstop
    });
}



async function runSession(prompt) {
    resetBars();
    setState(statePrepare);
    promptText.textContent = prompt;

    const start = Date.now();
    clearInterval(totalInterval);

    let finishing = false;

    totalInterval = setInterval(async () => {
        const elapsed = Math.floor((Date.now() - start) / 1000);

        // PREP 0..15s
        if (elapsed <= PREP_SECONDS) {
            const remain = PREP_SECONDS - elapsed;
            prepareTimer.textContent = remain > 0 ? remain : 0;
            prepareBar.style.width = `${((elapsed / PREP_SECONDS) * 100).toFixed(2)}%`;

            if (elapsed >= PREP_SECONDS && !recordingAllowed) {
                setState(stateRecording);
                promptEcho.textContent = prompt;
                recordingAllowed = true;
            }
        }

        // RECORD 15..(15+RECORD_SECONDS)s
        if (elapsed > PREP_SECONDS && elapsed <= TOTAL_SECONDS) {
            const recElapsed = elapsed - PREP_SECONDS;
            const remain = Math.max(RECORD_SECONDS - recElapsed, 0);
            recordTimer.textContent = formatMMSS(remain);
            recordBar.style.width = `${((recElapsed / RECORD_SECONDS) * 100).toFixed(2)}%`;
        }

        // END at TOTAL_SECONDS — do this ONCE
        if (!finishing && elapsed >= TOTAL_SECONDS) {
            finishing = true;
            clearInterval(totalInterval);
            recordingAllowed = false;

            try { recognition.stop(); } catch { }

            // Start the two tasks in parallel:
            // A) media wait (desktop only)
            const mediaWait = MOBILE_COMPAT
                ? Promise.resolve(null)       // on mobile, no MR/Blob
                : waitForMediaBlobOnce();     // desktop resolves in MR.onstop

            // ...
            // 2) compute final transcript & kick off API call
            let finalTranscript = (transcriptFinal + " " + transcriptInterim).trim();
            if (!finalTranscript) {
                console.warn("No speech detected. Substituting fallback transcript.");
                finalTranscript = "There's no text — the speaker did not say anything. Assign a 0 for everything.";
            }
            console.log("📝 Final transcript:", finalTranscript);

            // kick off backend evaluation
            const scoresPromise = fetchEvaluationFromAPI(prompt, finalTranscript);


            // If media recorder is running, stop it (will resolve mediaWait in onstop)
            if (!MOBILE_COMPAT && mediaRecorder && mediaRecorder.state !== "inactive") {
                try { mediaRecorder.stop(); } catch { }
            } else {
                // If no MR, resolve media wait immediately
                if (typeof mediaBlobReadyResolve === 'function') {
                    const resolver = mediaBlobReadyResolve;
                    mediaBlobReadyResolve = null;
                    resolver(null);
                }
            }

            // Show loading overlay while both are in flight
            showLoading(true);

            // Safely await both; even if one fails, we still proceed
            let scores = null;
            try {
                const [_, s] = await Promise.all([mediaWait.catch(() => null), scoresPromise.catch(() => null)]);
                scores = s || null;
            } catch (_) {
                scores = null;
            } finally {
                showLoading(false); // hide overlay regardless of success/failure
            }

            // Now render the evaluation (audio player will use mediaBlobUrl if present)
            showEvaluation(prompt, scores);
        }
    }, 200);
}


function showEvaluation(prompt, scores) {
    evalPrompt.innerHTML = `<span style="font-weight:600">Prompt:</span> ${prompt}`;
    setState(stateEval);

    // --- Mini audio player (keep if you collect audio) ---
    const actions = stateEval.querySelector('.actions');
    let player = stateEval.querySelector('#evalPlayer');
    if (!player) {
        player = document.createElement('audio');
        player.id = 'evalPlayer';
        player.controls = true;
        player.style.display = 'block';
        player.style.margin = '12px auto';
        actions.parentNode.insertBefore(player, actions);
    }
    if (mediaBlobUrl) {
        player.src = mediaBlobUrl;
        player.load();
    } else {
        // If no audio this run, blank out the player
        player.removeAttribute('src');
    }

    // --- Replace the 3 fixed metric cards with dynamic 0–4 cards from backend ---
    const row = stateEval.querySelector('.row');
    row.innerHTML = ""; // clear existing 3 cards

    if (Array.isArray(scores) && scores.length) {
        scores.forEach(({ trait, score }) => {
            const card = document.createElement('div');
            card.className = 'metric';
            card.innerHTML = `
        <h4>${trait}</h4>
        <p>${Number.isFinite(score) ? score : "-"}/4</p>
      `;
            row.appendChild(card);
        });
    } else {
        // Fallback (backend error)
        const card = document.createElement('div');
        card.className = 'metric';
        card.innerHTML = `
      <h4>Evaluation</h4>
      <p>–</p>
    `;
        row.appendChild(card);
    }

    // --- Replace "Areas to improve" with "Comments & Thoughts" (bullet list) ---
    const labelEl = stateEval.querySelector('.label');
    if (labelEl) labelEl.textContent = "Comments & Thoughts";

    const improveBox = stateEval.querySelector('.improve');
    const improveText = stateEval.querySelector('#improveText');

    if (improveBox && improveText) {
        // Build bullets from explanations
        if (Array.isArray(scores) && scores.length) {
            const ul = document.createElement('ul');
            ul.style.margin = "0";
            ul.style.paddingLeft = "1.1rem";
            scores.forEach(({ explanation }) => {
                const li = document.createElement('li');
                li.textContent = explanation || "";
                ul.appendChild(li);
            });
            improveText.replaceChildren(ul); // swap in the list
        } else {
            improveText.textContent = "Couldn’t fetch comments from the evaluator.";
        }
    }

    // --- Save recording button stays as-is (enabled if mediaBlob exists) ---
    let saveBtn = actions.querySelector('#btnSaveRecording');
    if (!saveBtn) {
        saveBtn = document.createElement('button');
        saveBtn.id = 'btnSaveRecording';
        saveBtn.className = 'btn';
        saveBtn.textContent = '💾 Save recording';
        actions.insertBefore(saveBtn, actions.firstChild);
    }
    saveBtn.disabled = !mediaBlob;
    saveBtn.onclick = () => {
        if (!mediaBlobUrl) return;
        const a = document.createElement('a');
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        a.href = mediaBlobUrl;
        a.download = `speaking-practice-${ts}.webm`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    };
}


function retry() {
    clearInterval(totalInterval);
    try { recognition.stop(); } catch { }
    cleanupMedia();
    resetBars();
    prepareTimer.textContent = 15
    recordTimer.textContent = "00:45"
    setState(stateStart);
}

// ======= Events
btnStart.addEventListener('click', async () => { await begin(); });
btnRetry.addEventListener('click', async () => {
    retry();
    await begin();
});

// Initialize
setState(stateStart);
