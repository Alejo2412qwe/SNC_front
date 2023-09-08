export class EmailValues {
  emailFrom?: string;
  emailTo?: string;
  subject?: string;
  userName?: string;
  token?: string;

  constructor(
    emailFrom?: string,
    emailTo?: string,
    subject?: string,
    userName?: string,
    token?: string
  ) {
    this.emailFrom = emailFrom;
    this.emailTo = emailTo;
    this.subject = subject;
    this.userName = userName;
    this.token = token;
  }
}
