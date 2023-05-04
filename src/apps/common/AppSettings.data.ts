const hostname = window && window.location && window.location.hostname;

const protocol = window && window.location && window.location.protocol;

const DEV_BACKEND_HTTPS = "https://devwebabgcare.adityabirla.com";
// const DEV_BACKEND = "http://3.110.87.55";

const DEV_BACKEND = "http://devwebabgcare.adityabirla.com";

const DEV_ULTRATECH_BACKEND = "http://dev.ultratechcare.com:8080";
const DEV_ULTRATECH_BACKEND_HTTPS = "https://dev.ultratechcare.com:8080";

const QA_BACKEND_HTTP =
  "http://dna-birlacare-alb-1449172325.ap-south-1.elb.amazonaws.com";
const QA_BACKEND_HTTPS = "https://qabirlacaredjango.adityabirla.com";
const UAT_BACKEND = "http://uat.ultratechcare.com";
const UAT_BACKEND_HTTPS = "https://uat.ultratechcare.com";
const PROD_BACKEND = "https://abgcaredjango.adityabirla.com";
const OCI_BACKEND_ORACLE = "https://webabgcaredjango.adityabirla.com";
const OCI_BACKEND_UAT_ORACLE = "https://uatwebbirlacaredjango.adityabirla.com";

export function getCurrentBaseUrl() {
  let base_url;

  if (hostname === "localhost") {
    // localhost base url
    base_url = DEV_BACKEND;
  } else if (hostname === "dev.ultratechcare.com" && protocol === "https:") {
    // DEV base url
    base_url = DEV_ULTRATECH_BACKEND_HTTPS;
  } else if (hostname === "dev.ultratechcare.com" && protocol === "http:") {
    base_url = DEV_ULTRATECH_BACKEND;
  } else if (
    hostname === "qabirlacare.adityabirla.com" &&
    protocol === "https:"
  ) {
    // QA base url
    base_url = QA_BACKEND_HTTPS;
  } else if (
    hostname === "qabirlacare.adityabirla.com" &&
    protocol === "http:"
  ) {
    // QA base url
    base_url = QA_BACKEND_HTTP;
  } else if (hostname === "uat.ultratechcare.com") {
    // UAT base url
    if (protocol === "http:")
      base_url = UAT_BACKEND;
    else
    base_url = UAT_BACKEND_HTTPS;
  } else if (hostname === "abgcare.adityabirla.com") {
    // PROD base url
    base_url = PROD_BACKEND;
  } else if (hostname === "webabgcare.adityabirla.com") {
    //OCI PROD url
    base_url = OCI_BACKEND_ORACLE;
  } else if (hostname === "uatwebbirlacare.adityabirla.com") {
    //OCI UAT url
    base_url = OCI_BACKEND_UAT_ORACLE;
  }
  return base_url;
}
