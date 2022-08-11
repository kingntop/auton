export function getFormatDate() {
    var rightNow = new Date();
    return rightNow.toISOString().slice(0, 10).replace(/-/g, "");
  }

