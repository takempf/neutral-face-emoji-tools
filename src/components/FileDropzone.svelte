<script>
  import { fromEvent } from 'file-selector';

  const { onFilesAdded } = $props();

  let isOverDropZone = $state(false);

  async function handleDrop(event) {
    event.preventDefault();
    isOverDropZone = false;

    const files = await fromEvent(event);
    onFilesAdded(files);
  }

  async function handleFileChange(event) {
    event.preventDefault();
    const files = await fromEvent(event);
    onFilesAdded(files);
  }

  function handleDragOver(event) {
    event.preventDefault();
    isOverDropZone = true;
  }

  function handleDragLeave() {
    isOverDropZone = false;
  }
</script>

<div
  class="dropzone"
  class:over={isOverDropZone}
  role="button"
  tabindex="0"
  ondrop={handleDrop}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}>
  <div class="dropzone__content input_note">
    <strong>Drop images here</strong> or click to open a file dialog
  </div>
  <input
    class="file-input"
    type="file"
    multiple
    accept="image/*;capture=camera"
    onchange={handleFileChange} />
</div>

<style>
  .dropzone {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    width: 100%;
    height: 150px;
    border: var(--color-dropzone-border) 3px dashed;
    border-radius: 5px;
    background: var(--color-dropzone-bg);
    transition:
      background 450ms,
      border-color 450ms;
  }

  .dropzone.over,
  .dropzone:hover {
    background: var(--color-dropzone-active-bg);
    border-color: var(--color-dropzone-active-border);
  }

  .file-input {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }

  .file-input:hover {
    cursor: pointer;
  }
</style>
