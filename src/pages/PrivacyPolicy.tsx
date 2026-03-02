import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const PrivacyPolicy = () => (
  <main>
    <div className="container py-4">
      <nav className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">Privacy Policy</span>
      </nav>
    </div>

    <section className="container pb-16 max-w-3xl">
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">Privacy Policy</h1>
      <p className="text-sm font-sans text-muted-foreground mb-8">Last updated March 02, 2026</p>

      <div className="prose max-w-none font-sans text-foreground space-y-6">
        <p>
          This privacy notice for Yarneria ('<strong>Company</strong>', '<strong>we</strong>', '<strong>us</strong>', or '<strong>our</strong>'), describes how and why we might collect, store, use, and/or share ('<strong>process</strong>') your information when you use our services ('<strong>Services</strong>'), such as when you:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
          <li>Visit our website at <a href="https://www.yarneria.com" className="text-primary underline">yarneria.com</a>, or any website of ours that links to this privacy notice</li>
          <li>Engage with us in other related ways, including any sales, marketing, or events</li>
        </ul>
        <p className="text-sm text-muted-foreground">
          <strong>Questions or concerns?</strong> Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:hello@yarneria.com" className="text-primary underline">hello@yarneria.com</a>.
        </p>

        <h2 className="font-serif text-xl font-semibold pt-4">Summary of Key Points</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with Yarneria and the Services, the choices you make, and the products and features you use.</p>
          <p><strong>Do we process any sensitive personal information?</strong> We do not process sensitive personal information.</p>
          <p><strong>Do we receive any information from third parties?</strong> We may receive information from public databases, marketing partners, social media platforms, and other outside sources.</p>
          <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.</p>
          <p><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific categories of third parties.</p>
          <p><strong>How do we keep your information safe?</strong> We have organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
          <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</p>
        </div>

        <h2 className="font-serif text-xl font-semibold pt-4">1. What Information Do We Collect?</h2>
        <p className="text-sm text-muted-foreground"><strong>Personal information you disclose to us:</strong> We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
        <p className="text-sm text-muted-foreground">The personal information we collect may include: names, phone numbers, email addresses, mailing addresses, usernames, and contact or authentication data.</p>
        <p className="text-sm text-muted-foreground"><strong>Payment Data.</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number. All payment data is stored by Stripe.</p>
        <p className="text-sm text-muted-foreground"><strong>Information automatically collected:</strong> Some information — such as your IP address and/or browser and device characteristics — is collected automatically when you visit our Services. This includes log and usage data, device data, and location data.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">2. How Do We Process Your Information?</h2>
        <p className="text-sm text-muted-foreground">We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. This includes facilitating account creation, delivering services, responding to inquiries, fulfilling orders, sending marketing communications, and protecting our Services.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">3. Legal Bases for Processing</h2>
        <p className="text-sm text-muted-foreground">We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law, including consent, performance of a contract, legitimate interests, legal obligations, and vital interests.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">4. When and With Whom Do We Share Your Information?</h2>
        <p className="text-sm text-muted-foreground">We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us. Categories include ad networks, payment processors, performance monitoring tools, retargeting platforms, sales & marketing tools, and social networks.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">5. Cookies and Tracking Technologies</h2>
        <p className="text-sm text-muted-foreground">We may use cookies and similar tracking technologies to access or store information. These include technical cookies, analytical cookies, authentication cookies, and advertising cookies. You may delete or disable cookies by changing your browser settings.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">6. How Long Do We Keep Your Information?</h2>
        <p className="text-sm text-muted-foreground">We keep your information for as long as necessary to fulfil the purposes outlined in this privacy notice unless otherwise required by law. No purpose will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">7. How Do We Keep Your Information Safe?</h2>
        <p className="text-sm text-muted-foreground">We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the Internet can be guaranteed to be 100% secure.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">8. Information from Minors</h2>
        <p className="text-sm text-muted-foreground">We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">9. Your Privacy Rights</h2>
        <p className="text-sm text-muted-foreground">In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right to request access, rectification, erasure, restriction of processing, and data portability. You can withdraw your consent at any time by contacting us.</p>
        <p className="text-sm text-muted-foreground">You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in emails or by contacting us.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">10. Do-Not-Track Features</h2>
        <p className="text-sm text-muted-foreground">We do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">11. Updates to This Notice</h2>
        <p className="text-sm text-muted-foreground">We may update this privacy notice from time to time. The updated version will be indicated by an updated 'Revised' date.</p>

        <h2 className="font-serif text-xl font-semibold pt-4">12. How Can You Contact Us?</h2>
        <p className="text-sm text-muted-foreground">
          If you have questions or comments about this notice, you may email us at <a href="mailto:hello@yarneria.com" className="text-primary underline">hello@yarneria.com</a> or by post to:
        </p>
        <address className="text-sm text-muted-foreground not-italic">
          Yarneria<br />
          H. Manto street 5<br />
          Klaipeda 92128<br />
          Lithuania
        </address>

        <h2 className="font-serif text-xl font-semibold pt-4">13. Review, Update, or Delete Your Data</h2>
        <p className="text-sm text-muted-foreground">
          Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. Please submit a request at <a href="mailto:hello@yarneria.com" className="text-primary underline">hello@yarneria.com</a>.
        </p>
      </div>
    </section>
  </main>
);

export default PrivacyPolicy;
