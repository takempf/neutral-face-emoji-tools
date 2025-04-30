<script>
  import { uploadEmoji } from '@/utils/uploadEmoji';

  import Upload from './Upload.svelte';
  import FileDropzone from './FileDropzone.svelte';

  import packageJson from '@@/package.json';

  import neutralFaceIcon from '@/assets/icon.png';
  import TKSvg from '@/assets/tk.svg';

  let uploads = [];
  let uploadsStatusById = {};
  let retryQueue = [];

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function uploadFiles(files) {
    for (const file of files) {
      await processRetryQueue();
      const id = uploadEmoji(file, (error) => {
        handleResponse(file, error, id);
      });
      uploadsStatusById = {
        ...uploadsStatusById,
        [id]: {
          type: 'uploading',
          message: 'Uploading...'
        }
      };
      uploads = [
        ...uploads,
        {
          file,
          id
        }
      ];
      //Slows down processing of file list so it doesn't get too far ahead of the callbacks
      await sleep(500);
    }

    //Add more waits to this last round of processing to be sure we don't miss the last files
    await sleep(5000);
    while (retryQueue.length > 0) {
      processRetryQueue();
      await sleep(5000);
    }
  }

  async function processRetryQueue() {
    while (retryQueue.length > 0) {
      const { id, file } = retryQueue.pop();
      uploadEmoji(file, (error) => {
        handleResponse(file, error, id);
      });
      await sleep(1000);
    }
  }

  async function handleResponse(file, error, id) {
    if (error) {
      if (error && error.message && error.message.includes('429')) {
        retryQueue.push({ id, file });
        uploadsStatusById = {
          ...uploadsStatusById,
          [id]: {
            type: 'uploading',
            message: 'Rate limit detected. Retrying...'
          }
        };
      } else {
        uploadsStatusById = {
          ...uploadsStatusById,
          [id]: {
            type: 'error',
            message: error.message || error
          }
        };
      }
    } else {
      uploadsStatusById = {
        ...uploadsStatusById,
        [id]: {
          type: 'success',
          message: 'Successfully Uploaded.'
        }
      };
    }
  }

  function handleFilesAdded(event) {
    const files = event.detail;

    uploadFiles(files);
  }
</script>

<div class="neutral-face-emoji-tools">
  <h4 class="heading">
    <img class="icon" src={neutralFaceIcon} alt="" />
    <span class="text">Bulk Emoji Uploader</span>
  </h4>
  <p class="subheading">
    Drag and drop images into the area below. Any images dropped there will be
    automatically uploaded using their filename as the emoji name.
  </p>
  <p class="input-note">
    Example: <span class="normal">"ditto.gif" will be added as "ditto"</span>
  </p>
  <FileDropzone on:filesadded={handleFilesAdded} />
  {#if uploads?.length}
    <ul class="uploads">
      {#each uploads as upload (upload.id)}
        <Upload {upload} status={uploadsStatusById[upload.id]} />
      {/each}
    </ul>
  {/if}
  <div class="footer">
    <a class="kempf-link" href="https://kempf.dev/#emoji-tools" target="_blank">
      <span>Crafted by</span>
      <img class="tk-logo" src={TKSvg} alt="kempf.dev" />
    </a>
    <var class="version-number">v{packageJson.version}</var>
  </div>
</div>

<style>
  .neutral-face-emoji-tools {
    --color-neutral-face-emoji-tools: #d293e4;
    --color-dropzone-bg: rgb(250, 250, 250);
    --color-dropzone-active-bg: rgb(240, 240, 240);
    --color-dropzone-border: rgb(240, 240, 240);
    --color-dropzone-active-border: rgb(230, 230, 230);
    --color-slack-info: #3aa3e3;
    --color-slack-success: #2ab27b;
    --color-slack-error: #cb5234;
    --color-slack-border: #e8e8e8;
    --color-text-gray: #616061;

    border: var(--color-slack-border) 1px solid;
    border-left: var(--color-neutral-face-emoji-tools) 3px solid;
    box-shadow: var(--dt_static_shadow-md); /* slack css var */
    border-radius: var(--dt_static_radius-base); /* slack css var */
    margin: 0 0 1.5em 0;
    padding: 1.5em;
    background: white;
    position: relative;

    /* Use flex for spacing needs */
    display: flex;
    flex-direction: column;
    gap: 1em;

    > * {
      margin: 0;
    }
  }

  .icon {
    margin: 0 5px 0 0;
    height: 1.25em;
    vertical-align: -25%;
  }

  .input-note {
    font-size: 0.9rem;
    line-height: 1.25rem;
    color: var(--color-text-gray);
  }

  .uploads {
    list-style-type: none;
    margin: 0;
    font-size: 0.9rem;
  }

  .footer {
    font-size: 0.75em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: -1em;

    a {
      color: black;
      opacity: 0.5;
      transition: opacity 250ms;

      &:hover {
        opacity: 0.75;
      }
    }

    .tk-logo {
      height: 0.75em;
    }
  }

  .kempf-link {
    display: flex;
    gap: 0.25em;
    align-items: center;
  }

  .version-number {
    font-style: normal;
    opacity: 0.5;
  }
</style>
