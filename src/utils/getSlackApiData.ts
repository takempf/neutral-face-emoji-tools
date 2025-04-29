export function getSlackApiData() {
  const scripts: NodeListOf<HTMLScriptElement> = document.querySelectorAll(
    'script[type="text/javascript"]'
  );
  let apiToken: string;
  let versionUid: string;

  scripts.forEach((script) => {
    const isBootDataScript = /var\sboot_data\s\=\s\{/.test(script.innerText);

    if (!isBootDataScript) {
      return;
    }

    const apiTokenResult = /["]?api_token["]?\:\s*\"(.+?)\"/g.exec(
      script.innerText
    );
    const versionUidResult = /["]?version_uid["]?\:\s*\"(.+?)\"/g.exec(
      script.innerText
    );

    if (apiTokenResult) {
      apiToken = apiTokenResult[1];
    }

    if (versionUidResult) {
      versionUid = versionUidResult[1];
    }
  });

  return {
    apiToken,
    versionUid
  };
}
