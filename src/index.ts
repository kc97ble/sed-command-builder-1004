import * as $ from "jquery";

console.log("Welcome to sed-command-builder!");
$("body").css("background-color", "#ececec");
(globalThis as any).jquery = $;

function assert(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || "assertion failed");
  }
}

function getFirstHalf(formData: Record<string, string>): string {
  switch (formData.condition) {
    case "all":
      return "";
    case "single": {
      const arg0 = formData["c-single-arg0"] || "";
      assert(/^[0-9]+$/.test(arg0), "must be integer");
      return arg0;
    }
    case "range": {
      const arg0 = formData["c-range-arg0"] || "";
      assert(/^[0-9]+$/.test(arg0), "must be integer");
      const arg1 = formData["c-range-arg1"] || "";
      assert(/^[0-9]+$/.test(arg1), "must be integer");
      return arg0 + "," + arg1;
    }
    case "custom": {
      const arg0 = formData["c-custom-arg0"];
      return arg0;
    }
    default:
      assert(false, "unknown condition");
  }
}

function getSecondHalf(formData: Record<string, string>): string {
  switch (formData.command) {
    case "none":
      return "";
    case "prepend":
      return "i " + (formData["m-prepend-arg0"] || "");
    case "append":
      return "a " + (formData["m-append-arg0"] || "");
    case "change":
      return "c " + (formData["m-change-arg0"] || "");
    case "delete":
      return "d";
    case "replace": {
      const arg0 = formData["m-replace-arg0"] || "";
      const arg1 = formData["m-replace-arg1"] || "";
      const arg2 = formData["m-replace-arg2"] || "";
      const delim = [..."/|@^!#%&*,.;"].find(
        (s) => !arg0.includes(s) && !arg1.includes(s) && !arg2.includes(s)
      );
      assert(delim, "cannot find delim");
      return `s${delim}${arg0}${delim}${arg1}${delim}${arg2}`;
    }
    case "translate": {
      const arg0 = formData["m-translate-arg0"] || "";
      const arg1 = formData["m-translate-arg1"] || "";
      assert(arg0.length === arg1.length, "lengths mismatch");
      const delim = [..."/|@^!#%&*,.;"].find(
        (s) => !arg0.includes(s) && !arg1.includes(s)
      );
      assert(delim, "cannot find delim");
      return `y${delim}${arg0}${delim}${arg1}${delim}`;
    }
    default:
      assert(false, "unknown command");
  }
}

function getGlobalOptions(formData: Record<string, string>): string[] {
  switch (formData["regex-type"]) {
    case "basic":
      return [];
    case "extended":
      return ["-E"];
    default:
      assert(false, "unknonwn regex type");
  }
}

function safelyQuote(text: string) {
  return "'" + text.replace(/\'/g, "'\"'\"'") + "'";
}

function build(formData: Record<string, string>) {
  try {
    const firstHalf = getFirstHalf(formData);
    const secondHalf = getSecondHalf(formData);
    const globalOptions = getGlobalOptions(formData);
    const args = [
      "sed",
      ...globalOptions,
      "-e",
      safelyQuote(firstHalf + secondHalf),
    ];
    const fullCommand = args.join(" ");
    return { data: { fullCommand } };
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    return { error: message };
  }
}

window.onload = () => {
  const formData: Record<string, string> = {};

  // add listeners to inputs
  $("#f-sedd-1759")
    .find("input")
    .each((_, inputElement) => {
      $(inputElement).on("input", () => {
        const { name, value } = inputElement;
        formData[name] = value;
      });
    });

  // add listeners to buttons
  $("#b-grsl-2348").on("click", () => {
    const { data, error } = build(formData);
    if (!data || error) {
      $("#p-rslt-1803")
        .text("error: " + (error || "unknown"))
        .css("color", "red");
    } else {
      const { fullCommand } = data;
      $("#p-rslt-1803").text(fullCommand).css("color", "inherit");
    }
  });
};
