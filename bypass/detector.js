const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      const startButton = document.querySelector('#tt-start-accept > div > div > span');
      const dialogSidebar = document.querySelector('body > app-root > div > div > div > test-taking > app-dialog-sidebar > div');
      
      if (dialogSidebar) {
        dialogSidebar.remove();
      }
      
      if (startButton && startButton.textContent === 'Agree & Proceed') {
        startButton.addEventListener('click', () => {
          onStartTest();
        });
        startButton.click();
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

const MESSAGES = {
  keys: [],
  keyPrompt: 'Enter access key (Get it from @tradex8055 on telegram)',
  demoMsg: 'THIS IS DEMO USE. If you don\'t have access key then please buy one or else you will not be able to use the extension', 
  bypassMsg: 'Security bypassed! Now you can copy/paste/switch between tabs/windows easily\n\nPro tip : Choose \'window\' option in screen capture dialog',
  blockedMsg: 'YOU HAVE BEEN BLOCKED FROM USING THE EXTENSION. Please contact the administrator or key-dealer',
  wrongKeyMsg: 'Wrong key, disabling extension!!! Please get the key from @tradex8055 on telegram',
  vipMsg: 'YOU ARE A VIP MEMBER. You can use this extension anytime without entering access keys. Enjoy :)',
  expiredMsg: 'Access key expired, Please enter the key again or get it from @ErrorxCode on telegram or @Infrared.x on instagram'
};

async function login() {
  const email = JSON.parse(window.localStorage.getItem('FkNeo')).email;

  // Remove domain-specific checks
  // Bypass blocked list checks
  // Bypass VIP list checks

  // Always allow access
  window.alert(MESSAGES.bypassMsg);
  console.log('BYPASSED!');

  const userData = {
    isLogin: true,
    isDemo: false,
    email: email,
    expiry: new Date().getTime() + 1000 * 60 * 60 * 24 * 90 // Optional: Set a long expiry
  };

  window.localStorage.setItem('FkNeo', JSON.stringify(userData));
}

async function onStartTest() {
  const storedData = window.localStorage.getItem('FkNeo');

  chrome.storage.local.get(['configs'], (result) => {
    const configs = result.configs;

    if (!storedData) {
      const newData = {
        isLogin: true, // Ensure login is always true
        isDemo: true,  // Allow demo access
        email: JSON.parse(window.localStorage.getItem('token')).email,
        expiry: new Date().getTime() + 1000 * 60 * 60 * 24 * 90 // Optional: Set a long expiry
      };

      window.localStorage.setItem('FkNeo', JSON.stringify(newData));
      window.alert(MESSAGES.bypassMsg);
      return;
    }

    const data = JSON.parse(storedData);

    if (data.isLogin) {
      // Bypass expiry checks
      window.alert(MESSAGES.bypassMsg);
      console.log('BYPASSED!');
    } else {
      login();
    }
  });
}

async function fetchList(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return text.split('\n');
  } catch (error) {
    console.log('Error fetching text file:', error);
    return [];
  }
}

const ENC_SALT = 'some_salt_value';
const ENC_ALGO = 'SHA-256';