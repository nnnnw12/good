/* ===== FIREBASE CONFIG ===== */
const firebaseConfig = {
  apiKey: "AIzaSyDvWKtXzjDyCFTNGLdWWEDN49uyEsRM49o",
  authDomain: "veyo-8908d.firebaseapp.com",
  databaseURL: "https://veyo-8908d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "veyo-8908d",
  storageBucket: "veyo-8908d.firebasestorage.app",
  messagingSenderId: "155361715647",
  appId: "1:155361715647:web:bd28044a1c0fdd6ff56d0a",
  measurementId: "G-V7Q0S3F2VQ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

/* ===== WEBRTC CONFIG ===== */
const ICE_SERVERS = [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
  { urls: ['stun:stun3.l.google.com:19302', 'stun:stun4.l.google.com:19302'] }
];

/* ===== i18n ===== */
const T = {
  en: {
    messenger:'Messenger',search:'Search...',favorites:'Favorites',savedMessages:'Saved messages',
    noContacts:'No contacts',settings:'Settings',profile:'Profile',voiceVideo:'Voice & Video',
    language:'Language',theme:'Theme',dark:'Dark',light:'Light',editProfile:'Edit Profile',
    addBanner:'Add banner',avatarUrl:'Avatar URL',bannerUrl:'Banner URL',nickname:'Nickname',
    tag:'Tag',nickRule:'A-Z, 0-9, space, _ - only. English only.',
    tagRule:'A-Z, _ only. Unique tag for friends to find you.',tagReadonly:'Tag cannot be changed after registration.',
    aboutMe:'About me',aboutPlaceholder:'Tell about yourself...',profileMusic:'Profile Music',musicUrl:'Music URL',
    musicCover:'Cover URL',musicName:'Music Name',save:'Save',saved:'Saved!',
    microphone:'Microphone',camera:'Camera',speakers:'Speakers',
    testMic:'Test Microphone',testCamera:'Test Camera',testSpeaker:'Test Speakers',
    stopTest:'Stop',noCameraMsg:'No camera detected',selectChat:'Select a chat',
    msgPlaceholder:'Message...',noSavedMsg:'No saved messages yet',
    nickEmpty:'Nickname cannot be empty',nickInvalid:'Only A-Z, 0-9, space, _ - allowed',
    nickTaken:'This nickname is already taken',tagTaken:'This tag is already taken',
    engOnly:'English only',tagInvalid:'Only A-Z and _ allowed',tagEmpty:'Tag cannot be empty',
    defaultDev:'Default',noneDev:'None',smileys:'Smileys',hands:'Hands',hearts:'Hearts',animals:'Animals',
    food:'Food',objects:'Objects',stickers:'Stickers',gifs:'GIFs',
    login:'Sign In',signIn:'Sign In',register:'Register',password:'Password',
    noAccount:"Don't have an account?",haveAccount:'Already have an account?',
    logout:'Log Out',welcomeSetup:'Welcome! Set up your profile',continue:'Continue',
    emailInvalid:'Invalid email address',passwordShort:'Password must be at least 6 characters',
    emailInUse:'This email is already registered',userNotFound:'User not found',wrongPassword:'Wrong password',
    authError:'Authentication error'
  },
  ru: {
    messenger:'Мессенджер',search:'Поиск...',favorites:'Избранное',savedMessages:'Сохранённые сообщения',
    noContacts:'Нет контактов',settings:'Настройки',profile:'Профиль',voiceVideo:'Голос и видео',
    language:'Язык',theme:'Тема',dark:'Тёмная',light:'Светлая',editProfile:'Редактировать профиль',
    addBanner:'Добавить баннер',avatarUrl:'URL аватарки',bannerUrl:'URL баннера',nickname:'Никнейм',
    tag:'Тег',nickRule:'Только A-Z, 0-9, пробел, _ -. Только англ.',
    tagRule:'Только A-Z, _. Уникальный тег для поиска.',tagReadonly:'Тег нельзя изменить после регистрации.',
    aboutMe:'О себе',aboutPlaceholder:'Расскажите о себе...',profileMusic:'Музыка профиля',musicUrl:'URL музыки',
    musicCover:'URL обложки',musicName:'Название',save:'Сохранить',saved:'Сохранено!',
    microphone:'Микрофон',camera:'Камера',speakers:'Динамики',
    testMic:'Проверить микрофон',testCamera:'Проверить камеру',testSpeaker:'Проверить динамики',
    stopTest:'Стоп',noCameraMsg:'Камера не обнаружена',selectChat:'Выберите чат',
    msgPlaceholder:'Сообщение...',noSavedMsg:'Нет сохранённых сообщений',
    nickEmpty:'Никнейм не может быть пустым',nickInvalid:'Только A-Z, 0-9, пробел, _ -',
    nickTaken:'Этот никнейм уже занят',tagTaken:'Этот тег уже занят',
    engOnly:'Только английский',tagInvalid:'Только A-Z и _',tagEmpty:'Тег не может быть пустым',
    defaultDev:'По умолчанию',noneDev:'Нет',smileys:'Смайлы',hands:'Руки',hearts:'Сердца',animals:'Животные',
    food:'Еда',objects:'Объекты',stickers:'Стикеры',gifs:'Гифки',
    login:'Вход',signIn:'Войти',register:'Регистрация',password:'Пароль',
    noAccount:'Нет аккаунта?',haveAccount:'Уже есть аккаунт?',
    logout:'Выйти',welcomeSetup:'Добро пожаловать! Настройте профиль',continue:'Продолжить',
    emailInvalid:'Неверный email',passwordShort:'Пароль минимум 6 символов',
    emailInUse:'Этот email уже зарегистрирован',userNotFound:'Пользователь не найден',wrongPassword:'Неверный пароль',
    authError:'Ошибка авторизации'
  }
};

let lang = localStorage.getItem('msg_lang') || 'en';
let theme = localStorage.getItem('msg_theme') || 'dark';
function t(key){return T[lang][key]||T.en[key]||key}
function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(T[lang][k])el.textContent=T[lang][k]});
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{const k=el.getAttribute('data-i18n-ph');if(T[lang][k])el.placeholder=T[lang][k]});
}
function applyTheme(){
  document.body.classList.toggle('light',theme==='light');
  document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#000':'#fff';
}

/* ===== STATE ===== */
let currentUser = null;
const state={currentChat:null,favorites:[],profile:{nickname:'User',tag:'',avatarUrl:'',bannerUrl:'',about:'',musicUrl:'',musicCover:'',musicName:''}};

/* WebRTC State */
let peerConnection = null;
let localStream = null;
let screenStream = null;
let isLocalVideoActive = true;
let isLocalAudioActive = true;
let isScreenSharing = false;
let callStartTime = null;
let callDurationInterval = null;
let currentRemoteUserId = null;
let callDirection = null; // 'outgoing' or 'incoming'

/* ===== DOM ===== */
const $=s=>document.querySelector(s);
const authScreen=$('#authScreen'),loginForm=$('#loginForm'),registerForm=$('#registerForm');
const loginEmail=$('#loginEmail'),loginPassword=$('#loginPassword'),loginError=$('#loginError');
const regEmail=$('#regEmail'),regPassword=$('#regPassword'),regTag=$('#regTag'),registerError=$('#registerError');
const showRegister=$('#showRegister'),showLogin=$('#showLogin');
const welcomeOverlay=$('#welcomeOverlay'),welcomeModal=$('#welcomeModal');
const welcomeAvatar=$('#welcomeAvatar'),welcomeAvatarMedia=$('#welcomeAvatarMedia');
const welcomeAvatarInput=$('#welcomeAvatarInput'),welcomeNicknameInput=$('#welcomeNicknameInput');
const welcomeNickError=$('#welcomeNickError'),welcomeSaveBtn=$('#welcomeSaveBtn');
const app=$('#app');
const sidebar=$('#sidebar'),emptyState=$('#emptyState'),activeChat=$('#activeChat');
const chatName=$('#chatName'),chatAvatar=$('#chatAvatar'),chatStatus=$('#chatStatus');
const messages=$('#messages'),msgInput=$('#msgInput'),sendBtn=$('#sendBtn'),backBtn=$('#backBtn');
const searchInput=$('#searchInput'),attachBtn=$('#attachBtn');
const profileBarAvatar=$('#profileBarAvatar'),profileBarBanner=$('#profileBarBanner');
const profileBarName=$('#profileBarName'),profileBarTag=$('#profileBarTag');
const settingsBtn=$('#settingsBtn'),settingsOverlay=$('#settingsOverlay'),settingsPanel=$('#settingsPanel');
const settingsBackBtn=$('#settingsBackBtn'),logoutBtn=$('#logoutBtn');
const profileEditOverlay=$('#profileEditOverlay'),profileEditPanel=$('#profileEditPanel');
const profileEditBackBtn=$('#profileEditBackBtn'),openProfileEdit=$('#openProfileEdit');
const avatarUrlInput=$('#avatarUrlInput'),bannerUrlInput=$('#bannerUrlInput');
const nicknameInput=$('#nicknameInput'),tagInput=$('#tagInput'),aboutInput=$('#aboutInput');
const nicknameError=$('#nicknameError'),aboutError=$('#aboutError');
const saveProfileBtn=$('#saveProfileBtn'),aboutCount=$('#aboutCount');
const musicToggleBtn=$('#musicToggleBtn'),musicFields=$('#musicFields'),musicArrow=$('#musicArrow');
const musicUrlInput=$('#musicUrlInput'),musicCoverInput=$('#musicCoverInput'),musicNameInput=$('#musicNameInput');
const musicPreview=$('#musicPreview'),musicPreviewCover=$('#musicPreviewCover'),musicPreviewName=$('#musicPreviewName');
const musicPlayBtn=$('#musicPlayBtn'),musicAudio=$('#musicAudio'),musicProgressBar=$('#musicProgressBar');
const bannerPlaceholder=$('#bannerPlaceholder'),bannerMedia=$('#bannerMedia');
const avatarPlaceholder=$('#avatarPlaceholder'),avatarMedia=$('#avatarMedia');
const favoritesChat=$('#favoritesChat');
const vvOverlay=$('#vvOverlay'),vvPanel=$('#vvPanel'),vvBackBtn=$('#vvBackBtn'),openVoiceVideo=$('#openVoiceVideo');
const micSelect=$('#micSelect'),cameraSelect=$('#cameraSelect'),speakerSelect=$('#speakerSelect');
const testMicBtn=$('#testMicBtn'),testCameraBtn=$('#testCameraBtn'),testSpeakerBtn=$('#testSpeakerBtn');
const micMeter=$('#micMeter'),micMeterFill=$('#micMeterFill'),cameraPreview=$('#cameraPreview');
const cameraVideo=$('#cameraVideo'),noCameraMsg=$('#noCameraMsg'),testAudio=$('#testAudio');
const profileModalOverlay=$('#profileModalOverlay'),profileModal=$('#profileModal'),closeProfileModal=$('#closeProfileModal');
const pmBanner=$('#pmBanner'),pmAvatar=$('#pmAvatar'),pmName=$('#pmName'),pmTag=$('#pmTag');
const pmAbout=$('#pmAbout'),pmMusic=$('#pmMusic'),pmMusicCover=$('#pmMusicCover'),pmMusicName=$('#pmMusicName');
const pmPlayBtn=$('#pmPlayBtn'),pmAudio=$('#pmAudio'),pmProgressBar=$('#pmProgressBar');
const emojiPicker=$('#emojiPicker'),emojiBtn=$('#emojiBtn'),pickerBody=$('#pickerBody');
const langSelect=$('#languageSelect'),themeSelect=$('#themeSelect');

/* Video Call Elements */
const videoCallOverlay=$('#videoCallOverlay'),videoCallModal=$('#videoCallModal');
const localVideo=$('#localVideo'),remoteVideo=$('#remoteVideo'),screenVideo=$('#screenVideo');
const localNoVideo=$('#localNoVideo'),remoteNoVideo=$('#remoteNoVideo');
const screenShareWrapper=$('#screenShareWrapper');
const callDuration=$('#callDuration'),callStatus=$('#callStatus');
const micToggleBtn=$('#micToggleBtn'),cameraToggleBtn=$('#cameraToggleBtn');
const screenShareBtn=$('#screenShareBtn'),hangupBtn=$('#hangupBtn');
const incomingCallOverlay=$('#incomingCallOverlay'),incomingCallModal=$('#incomingCallModal');
const incomingCallAvatar=$('#incomingCallAvatar'),incomingCallName=$('#incomingCallName');
const incomingAcceptBtn=$('#incomingAcceptBtn'),incomingRejectBtn=$('#incomingRejectBtn');
const pmVoiceCall=$('#pmVoiceCall'),pmVideoCall=$('#pmVideoCall');

/* ===== HELPERS ===== */
function isVideo(u){return/\.(mp4|webm|mov)([\?#].*)?$/i.test(u)}
function isImage(u){return/\.(png|jpg|jpeg|gif|webp|bmp|svg|ico)([\?#].*)?$/i.test(u)||u.includes('pinimg.com')}
function isAudioUrl(u){return/\.(mp3|ogg|wav|flac|aac|m4a|opus)([\?#].*)?$/i.test(u)}
function createMedia(url){
  if(isVideo(url)){const v=document.createElement('video');v.src=url;v.autoplay=true;v.loop=true;v.muted=true;v.playsInline=true;return v}
  const img=document.createElement('img');img.src=url;img.draggable=false;img.onerror=()=>img.style.display='none';return img;
}
function extractFilename(url){try{const f=new URL(url).pathname.split('/').pop();return f?f.replace(/\.[^.]+$/,'').replace(/[_-]/g,' '):''}catch(e){return''}}
function getTime(){const n=new Date();return n.getHours().toString().padStart(2,'0')+':'+n.getMinutes().toString().padStart(2,'0')}
function escapeHtml(t){const d=document.createElement('div');d.textContent=t;return d.innerHTML}

/* ===== VALIDATION ===== */
function valNick(v){if(!v.trim())return t('nickEmpty');if(/[^A-Za-z0-9 _\-]/.test(v))return t('nickInvalid');if(/[а-яА-ЯёЁ]/.test(v))return t('engOnly');return''}
function valTag(v){if(!v.trim())return t('tagEmpty');if(/[^A-Za-z_]/.test(v))return t('tagInvalid');if(/[а-яА-ЯёЁ]/.test(v))return t('engOnly');return''}
function valAbout(v){if(/[а-яА-ЯёЁ]/.test(v))return t('engOnly');return''}

/* ===== FIREBASE AUTH ===== */
async function checkTagUnique(tag){
  const snapshot = await db.ref('tags').child(tag.toUpperCase()).once('value');
  return !snapshot.exists();
}

async function checkNicknameUnique(nickname, excludeUid = null){
  const snapshot = await db.ref('nicknames').child(nickname.toUpperCase()).once('value');
  if(!snapshot.exists()) return true;
  if(excludeUid && snapshot.val() === excludeUid) return true;
  return false;
}

async function registerUser(email, password, tag){
  const tagUpper = tag.toUpperCase();
  const tagUnique = await checkTagUnique(tagUpper);
  if(!tagUnique) throw new Error('tagTaken');
  
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  const uid = cred.user.uid;
  
  await db.ref('tags').child(tagUpper).set(uid);
  await db.ref('users').child(uid).set({
    email: email,
    tag: tagUpper,
    nickname: '',
    avatarUrl: '',
    bannerUrl: '',
    about: '',
    musicUrl: '',
    musicCover: '',
    musicName: '',
    createdAt: Date.now(),
    setupComplete: false,
    online: true
  });
  
  return cred.user;
}

async function completeSetup(nickname, avatarUrl){
  const uid = currentUser.uid;
  const nickUpper = nickname.toUpperCase();
  
  const nickUnique = await checkNicknameUnique(nickUpper, uid);
  if(!nickUnique) throw new Error('nickTaken');
  
  await db.ref('nicknames').child(nickUpper).set(uid);
  await db.ref('users').child(uid).update({
    nickname: nickname,
    avatarUrl: avatarUrl || '',
    setupComplete: true
  });
  
  state.profile.nickname = nickname;
  state.profile.avatarUrl = avatarUrl || '';
}

async function loadUserProfile(){
  if(!currentUser) return;
  const snapshot = await db.ref('users').child(currentUser.uid).once('value');
  const data = snapshot.val();
  if(data){
    state.profile = {
      nickname: data.nickname || 'User',
      tag: data.tag || '',
      avatarUrl: data.avatarUrl || '',
      bannerUrl: data.bannerUrl || '',
      about: data.about || '',
      musicUrl: data.musicUrl || '',
      musicCover: data.musicCover || '',
      musicName: data.musicName || ''
    };
    return data;
  }
  return null;
}

async function saveUserProfile(){
  if(!currentUser) return;
  const uid = currentUser.uid;
  
  const nickUpper = state.profile.nickname.toUpperCase();
  const nickUnique = await checkNicknameUnique(nickUpper, uid);
  if(!nickUnique) throw new Error('nickTaken');
  
  const oldData = await db.ref('users').child(uid).once('value');
  const oldNick = oldData.val()?.nickname;
  if(oldNick && oldNick.toUpperCase() !== nickUpper){
    await db.ref('nicknames').child(oldNick.toUpperCase()).remove();
    await db.ref('nicknames').child(nickUpper).set(uid);
  }
  
  await db.ref('users').child(uid).update({
    nickname: state.profile.nickname,
    avatarUrl: state.profile.avatarUrl,
    bannerUrl: state.profile.bannerUrl,
    about: state.profile.about,
    musicUrl: state.profile.musicUrl,
    musicCover: state.profile.musicCover,
    musicName: state.profile.musicName
  });
}

async function loadFavorites(){
  if(!currentUser) return;
  const snapshot = await db.ref('favorites').child(currentUser.uid).once('value');
  state.favorites = snapshot.val() || [];
}

async function saveFavorites(){
  if(!currentUser) return;
  await db.ref('favorites').child(currentUser.uid).set(state.favorites);
}

/* ===== AUTH UI ===== */
showRegister.addEventListener('click', e=>{
  e.preventDefault();
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');
  loginError.textContent = '';
});

showLogin.addEventListener('click', e=>{
  e.preventDefault();
  registerForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
  registerError.textContent = '';
});

loginForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const btn = loginForm.querySelector('.auth-btn');
  btn.classList.add('loading');
  btn.disabled = true;
  loginError.textContent = '';
  
  try {
    await auth.signInWithEmailAndPassword(loginEmail.value, loginPassword.value);
  } catch(err){
    if(err.code === 'auth/user-not-found') loginError.textContent = t('userNotFound');
    else if(err.code === 'auth/wrong-password') loginError.textContent = t('wrongPassword');
    else if(err.code === 'auth/invalid-email') loginError.textContent = t('emailInvalid');
    else loginError.textContent = t('authError');
  }
  
  btn.classList.remove('loading');
  btn.disabled = false;
});

registerForm.addEventListener('submit', async e=>{
  e.preventDefault();
  const btn = registerForm.querySelector('.auth-btn');
  btn.classList.add('loading');
  btn.disabled = true;
  registerError.textContent = '';
  
  const tagErr = valTag(regTag.value);
  if(tagErr){
    registerError.textContent = tagErr;
    btn.classList.remove('loading');
    btn.disabled = false;
    return;
  }
  
  try {
    await registerUser(regEmail.value, regPassword.value, regTag.value);
  } catch(err){
    if(err.message === 'tagTaken') registerError.textContent = t('tagTaken');
    else if(err.code === 'auth/email-already-in-use') registerError.textContent = t('emailInUse');
    else if(err.code === 'auth/invalid-email') registerError.textContent = t('emailInvalid');
    else if(err.code === 'auth/weak-password') registerError.textContent = t('passwordShort');
    else registerError.textContent = t('authError');
  }
  
  btn.classList.remove('loading');
  btn.disabled = false;
});

/* ===== WELCOME SETUP ===== */
welcomeAvatarInput.addEventListener('input', ()=>{
  const url = welcomeAvatarInput.value.trim();
  if(url){
    welcomeAvatarMedia.innerHTML = '';
    welcomeAvatarMedia.appendChild(createMedia(url));
    welcomeAvatarMedia.style.display = 'block';
    welcomeAvatar.querySelector('.avatar-placeholder').style.display = 'none';
  } else {
    welcomeAvatarMedia.style.display = 'none';
    welcomeAvatarMedia.innerHTML = '';
    welcomeAvatar.querySelector('.avatar-placeholder').style.display = 'flex';
  }
});

welcomeSaveBtn.addEventListener('click', async ()=>{
  const nickname = welcomeNicknameInput.value.trim();
  const avatarUrl = welcomeAvatarInput.value.trim();
  
  const nickErr = valNick(nickname);
  if(nickErr){
    welcomeNickError.textContent = nickErr;
    return;
  }
  
  welcomeSaveBtn.disabled = true;
  welcomeNickError.textContent = '';
  
  try {
    await completeSetup(nickname, avatarUrl);
    welcomeOverlay.classList.remove('open');
    welcomeModal.classList.remove('open');
    renderProfileBar();
  } catch(err){
    if(err.message === 'nickTaken') welcomeNickError.textContent = t('nickTaken');
    else welcomeNickError.textContent = t('authError');
  }
  
  welcomeSaveBtn.disabled = false;
});

/* ===== AUTH STATE ===== */
auth.onAuthStateChanged(async user=>{
  if(user){
    currentUser = user;
    const profile = await loadUserProfile();
    await loadFavorites();
    
    authScreen.classList.add('hidden');
    app.classList.remove('hidden');
    
    if(profile && !profile.setupComplete){
      welcomeOverlay.classList.add('open');
      welcomeModal.classList.add('open');
    }
    
    renderProfileBar();
    applyLang();
    setupCallListener();
  } else {
    currentUser = null;
    authScreen.classList.remove('hidden');
    app.classList.add('hidden');
    welcomeOverlay.classList.remove('open');
    welcomeModal.classList.remove('open');
  }
});

/* ===== LOGOUT ===== */
logoutBtn.addEventListener('click', ()=>{
  closeSettings();
  if(peerConnection) endCall();
  auth.signOut();
});

/* ===== RENDER PROFILE BAR ===== */
function renderProfileBar(){
  profileBarName.textContent=state.profile.nickname||'User';
  profileBarTag.textContent=state.profile.tag?'@'+state.profile.tag:'';
  profileBarAvatar.innerHTML='';
  if(state.profile.avatarUrl){profileBarAvatar.appendChild(createMedia(state.profile.avatarUrl))}
  else{const ph=document.createElement('div');ph.className='profile-bar-avatar-placeholder';ph.textContent=(state.profile.nickname||'?')[0].toUpperCase();profileBarAvatar.appendChild(ph)}
  profileBarBanner.innerHTML='';
  if(state.profile.bannerUrl)profileBarBanner.appendChild(createMedia(state.profile.bannerUrl));
}

function renderProfileEdit(){
  avatarUrlInput.value=state.profile.avatarUrl||'';bannerUrlInput.value=state.profile.bannerUrl||'';
  nicknameInput.value=state.profile.nickname||'';tagInput.value=state.profile.tag||'';
  aboutInput.value=state.profile.about||'';aboutCount.textContent=(state.profile.about||'').length;
  musicUrlInput.value=state.profile.musicUrl||'';musicCoverInput.value=state.profile.musicCover||'';
  musicNameInput.value=state.profile.musicName||'';
  nicknameError.textContent='';aboutError.textContent='';
  if(state.profile.avatarUrl){avatarMedia.innerHTML='';avatarMedia.appendChild(createMedia(state.profile.avatarUrl));avatarMedia.style.display='block';avatarPlaceholder.style.display='none'}
  else{avatarMedia.style.display='none';avatarMedia.innerHTML='';avatarPlaceholder.style.display='flex'}
  if(state.profile.bannerUrl){bannerMedia.innerHTML='';bannerMedia.appendChild(createMedia(state.profile.bannerUrl));bannerMedia.style.display='block';bannerPlaceholder.style.display='none'}
  else{bannerMedia.style.display='none';bannerMedia.innerHTML='';bannerPlaceholder.style.display='flex'}
  updateMusicPreview();
}

/* ===== MUSIC ===== */
let musicPlaying=false;
function updateMusicPreview(){
  const url=musicUrlInput.value.trim();
  if(url){musicPreview.style.display='flex';musicPreviewName.textContent=musicNameInput.value.trim()||extractFilename(url)||'Unknown';
    musicPreviewCover.innerHTML='';const c=musicCoverInput.value.trim();
    if(c){const img=document.createElement('img');img.src=c;img.onerror=()=>img.remove();musicPreviewCover.appendChild(img)}
    else{musicPreviewCover.textContent='🎵'}
  }else{musicPreview.style.display='none';stopProfileMusic()}
}
function toggleProfileMusic(){musicPlaying?stopProfileMusic():playProfileMusic()}
function playProfileMusic(){
  const url=musicUrlInput.value.trim();if(!url)return;
  musicAudio.src=url;musicAudio.play().then(()=>{musicPlaying=true;musicPlayBtn.textContent='⏸';musicPlayBtn.classList.add('playing')}).catch(()=>{});
}
function stopProfileMusic(){musicAudio.pause();musicAudio.currentTime=0;musicPlaying=false;musicPlayBtn.textContent='▶';musicPlayBtn.classList.remove('playing');musicProgressBar.style.width='0'}
musicPlayBtn.addEventListener('click',toggleProfileMusic);
musicAudio.addEventListener('ended',stopProfileMusic);
musicAudio.addEventListener('timeupdate',()=>{if(musicAudio.duration){musicProgressBar.style.width=(musicAudio.currentTime/musicAudio.duration*100)+'%'}});
musicUrlInput.addEventListener('input',()=>{const u=musicUrlInput.value.trim();if(u&&!musicNameInput.value.trim()){const n=extractFilename(u);if(n)musicNameInput.value=n}updateMusicPreview()});
musicCoverInput.addEventListener('input',updateMusicPreview);
musicNameInput.addEventListener('input',updateMusicPreview);
musicToggleBtn.addEventListener('click',()=>{musicToggleBtn.classList.toggle('open');musicFields.classList.toggle('show');musicFields.classList.toggle('hidden')});

/* ===== SETTINGS ===== */
function openSettings(){settingsOverlay.classList.add('open');settingsPanel.classList.add('open');settingsBtn.classList.add('active')}
function closeSettings(){settingsOverlay.classList.remove('open');settingsPanel.classList.remove('open');settingsBtn.classList.remove('active')}
settingsBtn.addEventListener('click',()=>settingsPanel.classList.contains('open')?closeSettings():openSettings());
settingsBackBtn.addEventListener('click',closeSettings);
settingsOverlay.addEventListener('click',closeSettings);

/* ===== PROFILE EDIT ===== */
function openProfileEditPanel(){closeSettings();renderProfileEdit();setTimeout(()=>{profileEditOverlay.classList.add('open');profileEditPanel.classList.add('open')},80)}
function closeProfileEditPanel(){stopProfileMusic();profileEditOverlay.classList.remove('open');profileEditPanel.classList.remove('open')}
openProfileEdit.addEventListener('click',openProfileEditPanel);
profileEditBackBtn.addEventListener('click',closeProfileEditPanel);
profileEditOverlay.addEventListener('click',closeProfileEditPanel);

/* Live previews */
avatarUrlInput.addEventListener('input',()=>{const u=avatarUrlInput.value.trim();if(u){avatarMedia.innerHTML='';avatarMedia.appendChild(createMedia(u));avatarMedia.style.display='block';avatarPlaceholder.style.display='none'}else{avatarMedia.style.display='none';avatarMedia.innerHTML='';avatarPlaceholder.style.display='flex'}});
bannerUrlInput.addEventListener('input',()=>{const u=bannerUrlInput.value.trim();if(u){bannerMedia.innerHTML='';bannerMedia.appendChild(createMedia(u));bannerMedia.style.display='block';bannerPlaceholder.style.display='none'}else{bannerMedia.style.display='none';bannerMedia.innerHTML='';bannerPlaceholder.style.display='flex'}});
nicknameInput.addEventListener('input',()=>{const e=valNick(nicknameInput.value);nicknameError.textContent=e;nicknameInput.classList.toggle('error',!!e)});
aboutInput.addEventListener('input',()=>{const e=valAbout(aboutInput.value);aboutError.textContent=e;aboutInput.classList.toggle('error',!!e);aboutCount.textContent=aboutInput.value.length});

/* Save */
saveProfileBtn.addEventListener('click', async ()=>{
  const n=nicknameInput.value.trim(),av=avatarUrlInput.value.trim();
  const bn=bannerUrlInput.value.trim(),ab=aboutInput.value.trim();
  const mu=musicUrlInput.value.trim(),mc=musicCoverInput.value.trim();
  let mn=musicNameInput.value.trim();if(mu&&!mn){mn=extractFilename(mu)||'Unknown';musicNameInput.value=mn}
  const e1=valNick(n),e3=valAbout(ab);
  nicknameError.textContent=e1;aboutError.textContent=e3;
  nicknameInput.classList.toggle('error',!!e1);aboutInput.classList.toggle('error',!!e3);
  if(e1||e3)return;
  
  saveProfileBtn.disabled = true;
  
  try {
    Object.assign(state.profile,{nickname:n,avatarUrl:av,bannerUrl:bn,about:ab,musicUrl:mu,musicCover:mc,musicName:mn});
    await saveUserProfile();
    renderProfileBar();stopProfileMusic();
    saveProfileBtn.textContent=t('saved');saveProfileBtn.classList.add('saved');
    setTimeout(()=>{saveProfileBtn.textContent=t('save');saveProfileBtn.classList.remove('saved')},1500);
  } catch(err){
    if(err.message === 'nickTaken') nicknameError.textContent = t('nickTaken');
    else nicknameError.textContent = t('authError');
  }
  
  saveProfileBtn.disabled = false;
});

/* ===== VOICE & VIDEO ===== */
let micStream=null,micCtx=null,micAnim=null,camStream=null;
function openVV(){closeSettings();setTimeout(()=>{vvOverlay.classList.add('open');vvPanel.classList.add('open');enumerateDevices()},80)}
function closeVV(){vvOverlay.classList.remove('open');vvPanel.classList.remove('open');stopMicTest();stopCamTest()}
openVoiceVideo.addEventListener('click',openVV);
vvBackBtn.addEventListener('click',closeVV);
vvOverlay.addEventListener('click',closeVV);

async function enumerateDevices(){
  try{
    await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true},video:true}).then(s=>s.getTracks().forEach(t=>t.stop())).catch(()=>{});
    const devs=await navigator.mediaDevices.enumerateDevices();
    micSelect.innerHTML='';cameraSelect.innerHTML='';speakerSelect.innerHTML='';
    let hasMic=false,hasCam=false,hasSpk=false;
    devs.forEach(d=>{
      const opt=document.createElement('option');opt.value=d.deviceId;opt.textContent=d.label||d.kind;
      if(d.kind==='audioinput'){micSelect.appendChild(opt);hasMic=true}
      if(d.kind==='videoinput'){cameraSelect.appendChild(opt);hasCam=true}
      if(d.kind==='audiooutput'){speakerSelect.appendChild(opt);hasSpk=true}
    });
    if(!hasMic){const o=document.createElement('option');o.textContent=t('noneDev');micSelect.appendChild(o)}
    if(!hasCam){const o=document.createElement('option');o.textContent=t('noneDev');cameraSelect.appendChild(o)}
    if(!hasSpk){const o=document.createElement('option');o.textContent=t('defaultDev');speakerSelect.appendChild(o)}
  }catch(e){console.warn('Device enumeration failed',e)}
}

/* Mic test */
testMicBtn.addEventListener('click',()=>{if(micStream){stopMicTest();return}startMicTest()});
async function startMicTest(){
  try{
    micStream=await navigator.mediaDevices.getUserMedia({audio:{deviceId:micSelect.value?{exact:micSelect.value}:undefined,echoCancellation:true,noiseSuppression:true,autoGainControl:true}});
    micCtx=new AudioContext();const src=micCtx.createMediaStreamSource(micStream);
    const analyser=micCtx.createAnalyser();analyser.fftSize=256;src.connect(analyser);
    src.connect(micCtx.destination);
    const data=new Uint8Array(analyser.frequencyBinCount);
    micMeter.style.display='block';testMicBtn.textContent=t('stopTest');testMicBtn.classList.add('active');
    function draw(){micAnim=requestAnimationFrame(draw);analyser.getByteFrequencyData(data);
      let sum=0;data.forEach(v=>sum+=v);const avg=sum/data.length;
      micMeterFill.style.width=Math.min(avg/128*100,100)+'%'}
    draw();
  }catch(e){console.warn('Mic test failed',e)}
}
function stopMicTest(){
  if(micStream){micStream.getTracks().forEach(t=>t.stop());micStream=null}
  if(micCtx){micCtx.close();micCtx=null}if(micAnim)cancelAnimationFrame(micAnim);
  micMeter.style.display='none';micMeterFill.style.width='0';
  testMicBtn.textContent=t('testMic');testMicBtn.classList.remove('active');
}

/* Camera test */
testCameraBtn.addEventListener('click',()=>{if(camStream){stopCamTest();return}startCamTest()});
async function startCamTest(){
  try{
    camStream=await navigator.mediaDevices.getUserMedia({video:{deviceId:cameraSelect.value?{exact:cameraSelect.value}:undefined,width:{ideal:1920},height:{ideal:1080}}});
    cameraVideo.srcObject=camStream;cameraPreview.style.display='block';noCameraMsg.style.display='none';
    testCameraBtn.textContent=t('stopTest');testCameraBtn.classList.add('active');
  }catch(e){noCameraMsg.style.display='block';cameraPreview.style.display='none';console.warn('Camera test failed',e)}
}
function stopCamTest(){
  if(camStream){camStream.getTracks().forEach(t=>t.stop());camStream=null}
  cameraVideo.srcObject=null;cameraPreview.style.display='none';
  testCameraBtn.textContent=t('testCamera');testCameraBtn.classList.remove('active');
}

/* Speaker test */
testSpeakerBtn.addEventListener('click',()=>{
  testAudio.currentTime=0;
  if(testAudio.setSinkId&&speakerSelect.value){testAudio.setSinkId(speakerSelect.value).then(()=>testAudio.play()).catch(()=>testAudio.play())}
  else{testAudio.play()}
});

/* ===== PROFILE MODAL ===== */
let pmPlaying=false;
profileBarAvatar.addEventListener('click',openProfileModal);

function openProfileModal(){
  const p=state.profile;
  pmBanner.innerHTML='';if(p.bannerUrl)pmBanner.appendChild(createMedia(p.bannerUrl));
  pmAvatar.innerHTML='';if(p.avatarUrl){pmAvatar.appendChild(createMedia(p.avatarUrl))}
  else{pmAvatar.innerHTML='<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'}
  pmName.textContent=p.nickname||'User';pmTag.textContent=p.tag?'@'+p.tag:'';pmAbout.textContent=p.about||'';
  if(p.musicUrl){
    pmMusic.style.display='flex';pmMusicName.textContent=p.musicName||'Unknown';
    pmMusicCover.innerHTML='';if(p.musicCover){const img=document.createElement('img');img.src=p.musicCover;pmMusicCover.appendChild(img)}else{pmMusicCover.textContent='🎵'}
    pmAudio.src=p.musicUrl;
  }else{pmMusic.style.display='none'}
  profileModalOverlay.classList.add('open');profileModal.classList.add('open');
}

function closeProfileModalFn(){profileModalOverlay.classList.remove('open');profileModal.classList.remove('open');pmAudio.pause();pmAudio.currentTime=0;pmPlaying=false;pmPlayBtn.textContent='▶';pmPlayBtn.classList.remove('playing');pmProgressBar.style.width='0'}
closeProfileModal.addEventListener('click',closeProfileModalFn);
profileModalOverlay.addEventListener('click',closeProfileModalFn);
pmPlayBtn.addEventListener('click',()=>{if(pmPlaying){pmAudio.pause();pmPlaying=false;pmPlayBtn.textContent='▶';pmPlayBtn.classList.remove('playing')}
  else{pmAudio.play().then(()=>{pmPlaying=true;pmPlayBtn.textContent='⏸';pmPlayBtn.classList.add('playing')}).catch(()=>{})}});
pmAudio.addEventListener('timeupdate',()=>{if(pmAudio.duration)pmProgressBar.style.width=(pmAudio.currentTime/pmAudio.duration*100)+'%'});
pmAudio.addEventListener('ended',()=>{pmPlaying=false;pmPlayBtn.textContent='▶';pmPlayBtn.classList.remove('playing');pmProgressBar.style.width='0'});

/* ===== VIDEO CALL HANDLERS ===== */
async function startCall(remoteUserId, videoEnabled = true){
  if(!currentUser || peerConnection) return;
  
  currentRemoteUserId = remoteUserId;
  callDirection = 'outgoing';
  
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: micSelect.value ? { exact: micSelect.value } : undefined,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      },
      video: videoEnabled ? {
        deviceId: cameraSelect.value ? { exact: cameraSelect.value } : undefined,
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      } : false
    });
    
    if(videoEnabled && !localStream.getVideoTracks().length) {
      isLocalVideoActive = false;
    }
    
    peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    
    peerConnection.ontrack = (event) => {
      remoteVideo.srcObject = event.streams[0];
      remoteNoVideo.style.display = 'none';
    };
    
    peerConnection.onicecandidate = (event) => {
      if(event.candidate) {
        db.ref(`calls/${remoteUserId}/${currentUser.uid}/candidates`).push(event.candidate.toJSON());
      }
    };
    
    peerConnection.onconnectionstatechange = () => {
      if(peerConnection.connectionState === 'failed') {
        endCall();
      }
    };
    
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    
    await db.ref(`calls/${remoteUserId}/${currentUser.uid}`).set({
      from: currentUser.uid,
      type: videoEnabled ? 'video' : 'audio',
      offer: offer.toJSON(),
      status: 'calling',
      timestamp: Date.now()
    });
    
    openVideoCallUI(videoEnabled);
    closeProfileModalFn();
    
  } catch(err) {
    console.error('Failed to start call:', err);
    endCall();
  }
}

async function answerCall(remoteUserId, callData){
  if(!currentUser || peerConnection) return;
  
  currentRemoteUserId = remoteUserId;
  callDirection = 'incoming';
  
  try {
    const videoEnabled = callData.type === 'video';
    localStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: micSelect.value ? { exact: micSelect.value } : undefined,
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      },
      video: videoEnabled ? {
        deviceId: cameraSelect.value ? { exact: cameraSelect.value } : undefined,
        width: { ideal: 1920 },
        height: { ideal: 1080 }
      } : false
    });
    
    if(videoEnabled && !localStream.getVideoTracks().length) {
      isLocalVideoActive = false;
    }
    
    peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    
    peerConnection.ontrack = (event) => {
      remoteVideo.srcObject = event.streams[0];
      remoteNoVideo.style.display = 'none';
    };
    
    peerConnection.onicecandidate = (event) => {
      if(event.candidate) {
        db.ref(`calls/${remoteUserId}/${currentUser.uid}/candidates`).push(event.candidate.toJSON());
      }
    };
    
    peerConnection.onconnectionstatechange = () => {
      if(peerConnection.connectionState === 'failed') {
        endCall();
      }
    };
    
    const offer = new RTCSessionDescription(callData.offer);
    await peerConnection.setRemoteDescription(offer);
    
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    
    await db.ref(`calls/${remoteUserId}/${currentUser.uid}`).update({
      answer: answer.toJSON(),
      status: 'answered'
    });
    
    openVideoCallUI(videoEnabled);
    
  } catch(err) {
    console.error('Failed to answer call:', err);
    endCall();
  }
}

function openVideoCallUI(videoEnabled = true){
  isLocalVideoActive = videoEnabled;
  isLocalAudioActive = true;
  
  localVideo.srcObject = localStream;
  if(!videoEnabled) {
    localNoVideo.style.display = 'flex';
    localVideo.style.display = 'none';
  } else {
    localNoVideo.style.display = 'none';
    localVideo.style.display = 'block';
  }
  
  remoteNoVideo.style.display = 'flex';
  remoteVideo.style.display = 'none';
  
  callStartTime = Date.now();
  startCallDurationTimer();
  
  videoCallOverlay.classList.add('open');
  videoCallModal.classList.add('open');
  incomingCallOverlay.classList.remove('open');
  incomingCallModal.classList.remove('open');
}

function startCallDurationTimer(){
  if(callDurationInterval) clearInterval(callDurationInterval);
  callDurationInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    callDuration.textContent = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  }, 1000);
}

function endCall(){
  if(callDurationInterval) clearInterval(callDurationInterval);
  
  if(localStream) {
    localStream.getTracks().forEach(t => t.stop());
    localStream = null;
  }
  
  if(screenStream) {
    screenStream.getTracks().forEach(t => t.stop());
    screenStream = null;
  }
  
  if(peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  
  if(currentRemoteUserId && currentUser) {
    db.ref(`calls/${currentRemoteUserId}/${currentUser.uid}`).remove();
  }
  
  videoCallOverlay.classList.remove('open');
  videoCallModal.classList.remove('open');
  incomingCallOverlay.classList.remove('open');
  incomingCallModal.classList.remove('open');
  
  isLocalVideoActive = true;
  isLocalAudioActive = true;
  isScreenSharing = false;
  currentRemoteUserId = null;
  callDirection = null;
}

micToggleBtn.addEventListener('click', () => {
  if(!localStream) return;
  isLocalAudioActive = !isLocalAudioActive;
  localStream.getAudioTracks().forEach(track => track.enabled = isLocalAudioActive);
  micToggleBtn.classList.toggle('active', isLocalAudioActive);
});

cameraToggleBtn.addEventListener('click', () => {
  if(!localStream) return;
  isLocalVideoActive = !isLocalVideoActive;
  localStream.getVideoTracks().forEach(track => track.enabled = isLocalVideoActive);
  cameraToggleBtn.classList.toggle('active', isLocalVideoActive);
  
  if(!isLocalVideoActive) {
    localVideo.style.display = 'none';
    localNoVideo.style.display = 'flex';
  } else {
    localVideo.style.display = 'block';
    localNoVideo.style.display = 'none';
  }
});

screenShareBtn.addEventListener('click', async () => {
  if(!peerConnection) return;
  
  try {
    if(!isScreenSharing) {
      screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: false
      });
      
      const screenTrack = screenStream.getVideoTracks()[0];
      const sender = peerConnection.getSenders().find(s => s.track?.kind === 'video');
      
      if(sender) {
        await sender.replaceTrack(screenTrack);
        screenShareWrapper.style.display = 'block';
        screenVideo.srcObject = screenStream;
        screenShareBtn.classList.add('active');
        isScreenSharing = true;
        
        screenTrack.onended = () => {
          stopScreenShare();
        };
      }
    } else {
      stopScreenShare();
    }
  } catch(err) {
    console.error('Screen sharing failed:', err);
  }
});

async function stopScreenShare(){
  if(screenStream) {
    screenStream.getTracks().forEach(t => t.stop());
    screenStream = null;
  }
  
  if(peerConnection && localStream) {
    const videoTrack = localStream.getVideoTracks()[0];
    const sender = peerConnection.getSenders().find(s => s.track?.kind === 'video');
    if(sender && videoTrack) {
      await sender.replaceTrack(videoTrack);
    }
  }
  
  screenShareWrapper.style.display = 'none';
  screenShareBtn.classList.remove('active');
  isScreenSharing = false;
}

hangupBtn.addEventListener('click', endCall);

pmVoiceCall.addEventListener('click', async () => {
  closeProfileModalFn();
  const remoteUserId = currentUser.uid;
  await startCall(remoteUserId, false);
});

pmVideoCall.addEventListener('click', async () => {
  closeProfileModalFn();
  const remoteUserId = currentUser.uid;
  await startCall(remoteUserId, true);
});

incomingAcceptBtn.addEventListener('click', async () => {
  if(!currentRemoteUserId) return;
  const callRef = db.ref(`calls/${currentRemoteUserId}/${currentUser.uid}`);
  const snapshot = await callRef.once('value');
  const callData = snapshot.val();
  if(callData) {
    await answerCall(currentRemoteUserId, callData);
  }
});

incomingRejectBtn.addEventListener('click', () => {
  if(currentRemoteUserId && currentUser) {
    db.ref(`calls/${currentRemoteUserId}/${currentUser.uid}`).remove();
  }
  incomingCallOverlay.classList.remove('open');
  incomingCallModal.classList.remove('open');
  currentRemoteUserId = null;
});

function setupCallListener(){
  if(!currentUser) return;
  
  db.ref(`calls/${currentUser.uid}`).on('child_added', async (snapshot) => {
    const data = snapshot.val();
    if(data && data.status === 'calling' && !peerConnection) {
      currentRemoteUserId = data.from;
      
      const userRef = await db.ref(`users/${data.from}`).once('value');
      const userData = userRef.val();
      
      incomingCallAvatar.textContent = userData?.nickname?.charAt(0)?.toUpperCase() || '?';
      incomingCallName.textContent = userData?.nickname || 'User';
      
      incomingCallOverlay.classList.add('open');
      incomingCallModal.classList.add('open');
    }
  });
}

/* ===== FAVORITES CHAT ===== */
function openFavoritesChat(){
  state.currentChat='favorites';
  document.querySelectorAll('.chat-item').forEach(el=>el.classList.remove('active'));
  favoritesChat.classList.add('active');emptyState.style.display='none';activeChat.style.display='flex';
  chatName.textContent=t('favorites');chatStatus.textContent=t('savedMessages');
  chatAvatar.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="#ffcc00" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
  renderFavoritesMessages();
  if(window.innerWidth<=768)sidebar.classList.add('hidden-mobile');
}

function renderFavoritesMessages(){
  messages.innerHTML='';
  if(!state.favorites.length){const e=document.createElement('div');e.style.cssText='color:var(--text5);text-align:center;margin-top:40px;font-size:14px;user-select:none';e.textContent=t('noSavedMsg');messages.appendChild(e);return}
  state.favorites.forEach(msg=>{
    const div=document.createElement('div');div.className='message sent';
    if(msg.type==='sticker'){div.classList.add('sticker-msg');div.innerHTML='<div class="sticker-content">'+msg.text+'</div>'}
    else if(msg.type==='media'){
      div.classList.add('media-msg');
      if(isImage(msg.url)){div.innerHTML='<img src="'+escapeHtml(msg.url)+'" loading="lazy">'}
      else if(isVideo(msg.url)){div.innerHTML='<video src="'+escapeHtml(msg.url)+'" controls playsinline></video>'}
      else if(isAudioUrl(msg.url)){div.innerHTML='<audio src="'+escapeHtml(msg.url)+'" controls></audio>'}
    }else if(msg.type==='file'){
      div.classList.add('file-msg');div.innerHTML='<span class="file-icon">📄</span><span class="file-name">'+escapeHtml(msg.text)+'</span>';
    }else{div.textContent=msg.text}
    const time=document.createElement('div');time.className='message-time';time.textContent=msg.time||'';div.appendChild(time);
    messages.appendChild(div);
  });
  messages.scrollTop=messages.scrollHeight;
}

favoritesChat.addEventListener('click',openFavoritesChat);

/* Send message */
async function sendMsg(){
  const text=msgInput.value.trim();if(!text||state.currentChat!=='favorites')return;
  let msgObj={type:'text',text,time:getTime()};
  if(isImage(text)||isVideo(text)||isAudioUrl(text)){msgObj={type:'media',url:text,text,time:getTime()}}
  state.favorites.push(msgObj);
  await saveFavorites();
  renderFavoritesMessages();
  msgInput.value='';msgInput.style.height='auto';
}
sendBtn.addEventListener('click',sendMsg);
msgInput.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg()}});
msgInput.addEventListener('input',()=>{msgInput.style.height='auto';msgInput.style.height=Math.min(msgInput.scrollHeight,120)+'px'});

/* Attach file */
attachBtn.addEventListener('click',()=>{
  if(state.currentChat!=='favorites')return;
  const inp=document.createElement('input');inp.type='file';inp.accept='image/*,video/*,audio/*,.pdf,.zip,.doc,.docx';
  inp.addEventListener('change', async ()=>{
    if(!inp.files.length)return;const file=inp.files[0];
    const reader=new FileReader();
    if(file.type.startsWith('image/')||file.type.startsWith('video/')||file.type.startsWith('audio/')){
      reader.onload= async ()=>{
        const url=reader.result;let type='media';
        state.favorites.push({type,url,text:file.name,time:getTime()});
        await saveFavorites();
        renderFavoritesMessages();
      };reader.readAsDataURL(file);
    }else{
      state.favorites.push({type:'file',text:file.name,time:getTime()});
      await saveFavorites();
      renderFavoritesMessages();
    }
  });inp.click();
});

/* ===== EMOJI/STICKER/GIF PICKER ===== */
const emojiData=[
  {name:'smileys',emojis:'😀😁😂🤣😃😄😅😆😉😊😋😎😍🥰😘😗😙😚🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮🤐😯😪😫😴😌😛😜😝🤤😒😓😔😕🙃🤑😲🙁😖😞😟😤😢😭😦😧😨😩🤯😬😰😱🥵🥶😳🤪😵😡😠🤬😷🤒🤕🤢🤮🤧😇🤠🤡🥳🥺🤥🤫🤭🧐🤓😈👿💀☠👻👽👾🤖💩'},
  {name:'hands',emojis:'👋🤚🖐✋🖖👌🤏✌🤞🤟🤘🤙👈👉👆🖕👇☝👍👎✊👊🤛🤜👏🙌👐🤲🤝🙏💪🦾🦵🦶👂👃👀👁👅👄💋'},
  {name:'hearts',emojis:'❤🧡💛💚💙💜🖤🤍🤎💔❣💕💞💓💗💖💘💝💟♥🫀❤‍🔥❤‍🩹'},
  {name:'animals',emojis:'🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🙈🙉🙊🐔🐧🐦🐤🐣🦆🦅🦉🦇🐺🐗🐴🦄🐝🐛🦋🐌🐞🐜🕷🐢🐍🦎🦖🦕🐙🦑🦐🦀🐡🐠🐟🐬🐳🐋🦈🐊🐘🦏🐪🐫🦒🦘🐃🐄🐎🐖🐏🐑🐐🦌🐕🐈🐓🦃🦚🦜🦢🕊🐇🦝🦨🦥🐁🐀🐿🦔'},
  {name:'food',emojis:'🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥒🌶🌽🥕🥔🍠🥐🍞🥖🧀🥚🍳🥞🥓🥩🍗🍖🌭🍔🍟🍕🥪🌮🌯🥗🍝🍜🍲🍛🍣🍱🥟🍤🍙🍚🍘🍥🥮🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🥜🍯🍼☕🍵🥤🍶🍺🍻🥂🍷🥃🍸🍹🍾'},
  {name:'objects',emojis:'⌚📱💻⌨🖥🖨🖱🖲🕹💽💾📷📹🎥📽🎞📞☎📟📠📺📻🎙🎚🎛🧭⏱⏲⏰🕰⌛⏳📡🔋🔌💡🔦🕯🧯🛢💰💵💴💳🔑🗝🔨🪓⛏🔧🔩🗜⚙🧲🔫💣🧨🪓🔪🗡⚔🛡🔮🧿🧸🎈🎉🎊🎋🎍🎎🎏🎐🧧🎑🎀🎁🎗🎟🎫🎮🕹🧩♟🎭🎨🧵🧶🎲🎯🎳🎰🎱'}
];
const stickerData=['😂','🥰','😎','🤔','😤','💀','👻','🔥','❤','💯','👍','👎','🎉','😭','🤡','💩','🥺','😈','✨','🌈','🍕','🎮','💎','🚀','🦄','🐱','🐶','🌸','⭐','🌙'];
const animStickers=[
  {e:'😂',anim:'bounce'},{e:'❤',anim:'pulse'},{e:'👋',anim:'wave'},{e:'🔥',anim:'shake'},
  {e:'⭐',anim:'spin'},{e:'🎉',anim:'bounce'},{e:'💀',anim:'shake'},{e:'🚀',anim:'bounce'},
  {e:'💎',anim:'pulse'},{e:'🌈',anim:'wave'},{e:'👻',anim:'shake'},{e:'🦄',anim:'bounce'},
  {e:'💩',anim:'spin'},{e:'🤡',anim:'shake'},{e:'💯',anim:'pulse'},{e:'🎮',anim:'bounce'}
];

let currentPickerTab='emoji';
function renderPicker(tab){
  currentPickerTab=tab;pickerBody.innerHTML='';
  document.querySelectorAll('.picker-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  if(tab==='emoji'){
    emojiData.forEach(cat=>{
      const sec=document.createElement('div');sec.className='picker-category';
      const title=document.createElement('div');title.className='picker-category-name';title.textContent=t(cat.name)||cat.name;sec.appendChild(title);
      const grid=document.createElement('div');grid.className='picker-grid';
      [...cat.emojis].forEach(em=>{
        if(em.codePointAt(0)<256)return;
        const btn=document.createElement('button');btn.className='picker-item';btn.textContent=em;
        btn.addEventListener('click',()=>{const pos=msgInput.selectionStart;const val=msgInput.value;msgInput.value=val.slice(0,pos)+em+val.slice(pos);msgInput.focus();msgInput.selectionStart=msgInput.selectionEnd=pos+em.length});
        grid.appendChild(btn);
      });
      sec.appendChild(grid);pickerBody.appendChild(sec);
    });
  }else if(tab==='stickers'){
    const sec=document.createElement('div');sec.className='picker-category';
    const title=document.createElement('div');title.className='picker-category-name';title.textContent=t('stickers');sec.appendChild(title);
    const grid=document.createElement('div');grid.className='picker-grid';
    stickerData.forEach(s=>{
      const btn=document.createElement('button');btn.className='picker-item sticker-item';btn.textContent=s;
      btn.addEventListener('click',()=>{sendSticker(s)});
      grid.appendChild(btn);
    });
    sec.appendChild(grid);pickerBody.appendChild(sec);
    const sec2=document.createElement('div');sec2.className='picker-category';
    const title2=document.createElement('div');title2.className='picker-category-name';title2.textContent='Animated';sec2.appendChild(title2);
    const grid2=document.createElement('div');grid2.className='picker-grid';
    animStickers.forEach(s=>{
      const btn=document.createElement('button');btn.className='picker-item sticker-item';btn.textContent=s.e;
      btn.style.animation=s.anim+' .6s infinite alternate';
      btn.addEventListener('click',()=>{sendSticker(s.e)});
      grid2.appendChild(btn);
    });
    sec2.appendChild(grid2);pickerBody.appendChild(sec2);
  }else if(tab==='gifs'){
    const sec=document.createElement('div');sec.className='picker-category';
    const title=document.createElement('div');title.className='picker-category-name';title.textContent=t('gifs');sec.appendChild(title);
    const grid=document.createElement('div');grid.className='gif-grid';
    const gifEmojis=['😂','😍','🥳','🤯','😱','🥺','😤','🤩','💃','🕺','👏','🙌','💪','🎉','🔥','❤‍🔥','💀','👀','🤝','✌'];
    const anims=['bounce','pulse','shake','wave','spin'];
    gifEmojis.forEach((e,i)=>{
      const btn=document.createElement('button');btn.className='gif-item';
      btn.style.cssText='display:flex;align-items:center;justify-content:center;font-size:40px;animation:'+anims[i%anims.length]+' .6s infinite alternate';
      btn.textContent=e;
      btn.addEventListener('click',()=>{sendSticker(e)});
      grid.appendChild(btn);
    });
    sec.appendChild(grid);pickerBody.appendChild(sec);
  }
}

async function sendSticker(emoji){
  if(state.currentChat!=='favorites')return;
  state.favorites.push({type:'sticker',text:emoji,time:getTime()});
  await saveFavorites();
  renderFavoritesMessages();
  closeEmojiPicker();
}

function closeEmojiPicker(){emojiPicker.classList.remove('open')}
emojiBtn.addEventListener('click',()=>{
  if(emojiPicker.classList.contains('open')){closeEmojiPicker()}
  else{renderPicker(currentPickerTab);emojiPicker.classList.add('open')}
});
document.querySelectorAll('.picker-tab').forEach(tab=>{
  tab.addEventListener('click',()=>renderPicker(tab.dataset.tab));
});
document.addEventListener('click',e=>{if(emojiPicker.classList.contains('open')&&!emojiPicker.contains(e.target)&&e.target!==emojiBtn)closeEmojiPicker()});

/* ===== LANGUAGE & THEME ===== */
langSelect.value=lang;themeSelect.value=theme;
langSelect.addEventListener('change',()=>{lang=langSelect.value;localStorage.setItem('msg_lang',lang);applyLang();
  if(state.currentChat==='favorites'){chatName.textContent=t('favorites');chatStatus.textContent=t('savedMessages')}
  if(!micStream)testMicBtn.textContent=t('testMic');
  if(!camStream)testCameraBtn.textContent=t('testCamera');
  testSpeakerBtn.textContent=t('testSpeaker');
});
themeSelect.addEventListener('change',()=>{theme=themeSelect.value;localStorage.setItem('msg_theme',theme);applyTheme()});

/* ===== MOBILE ===== */
backBtn.addEventListener('click',()=>{
  sidebar.classList.remove('hidden-mobile');state.currentChat=null;
  emptyState.style.display='flex';activeChat.style.display='none';
  document.querySelectorAll('.chat-item').forEach(el=>el.classList.remove('active'));
});

/* ===== KEYBOARD ===== */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if(profileModal.classList.contains('open'))closeProfileModalFn();
    else if(profileEditPanel.classList.contains('open'))closeProfileEditPanel();
    else if(vvPanel.classList.contains('open'))closeVV();
    else if(settingsPanel.classList.contains('open'))closeSettings();
    else if(emojiPicker.classList.contains('open'))closeEmojiPicker();
    else if(videoCallModal.classList.contains('open'))endCall();
  }
});

/* ===== PREVENT DOUBLE-TAP ZOOM ===== */
let lastTap=0;
document.addEventListener('touchend',e=>{const now=Date.now();if(now-lastTap<300)e.preventDefault();lastTap=now},{passive:false});

/* ===== INIT ===== */
applyTheme();applyLang();
console.log('Veyo Messenger loaded with Firebase and WebRTC video calls.');
