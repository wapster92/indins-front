export default ({ app }, inject) => {

  function downloadByURL(url, name) {
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  inject('downloadByURL', downloadByURL);
}