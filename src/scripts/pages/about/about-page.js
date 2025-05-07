export default class AboutPage {
  async render() {
    return `
    <section class="background-image">
  <div class="about__container">
    <div class="about__inner">
      <h1 class="about__heading">About Page</h1>
      <p class="about__paragraph">
        In the year 2025, where data flows faster than light and memories are preserved beyond lifetimes, a new form of storytelling emerged — not etched in paper, but encoded in digital realms.
      </p>
      <p class="about__paragraph">
        Welcome to <strong>VOID Story</strong> — the nexus where imagination meets innovation.
      </p>
      <p class="about__paragraph">
        On this platform, stories are no longer just told — they are uploaded, embedded, and eternally archived. With a single pulse of your fingerprint, you can transmit visions of alternate futures, encrypted echoes of emotion, or chronicles from forgotten galaxies.
      </p>
      <p class="about__paragraph">
        While traditional feeds capture fleeting moments, VoidStory deciphers the narrative behind every pixel. Every story you share becomes part of a living archive — accessible across space-time, designed for dreamers who code their legacy.
      </p>
      <p class="about__paragraph">
        So upload your reality, broadcast your myth. In this era of neural webs and cloud consciousness, your story is no longer bound by time — it becomes part of the collective tale.
      </p>
      </p>
      <footer class="about__footer">
        <div class="footer__content">
          <div class="footer__brand">
            <span class="footer__logo">VOID</span>
            <span class="footer__slogan">Encrypting realities since 2025</span>
          </div>
          <div class="footer__social">
            <a href="#" class="social__link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social__link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social__link"><i class="fab fa-github"></i></a>
          </div>
        </div>
        <div class="footer__copyright">
          &copy; 2025 Difa Muhamad. All realities reserved.
        </div>
      </footer>
    </div>
  </div>
</section>

    `;
  }

  async afterRender() {
    // Future logic goes here
  }
}
