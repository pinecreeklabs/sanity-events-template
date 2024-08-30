import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms & Conditions',
    alternates: {
      canonical: `/terms`,
    },
  }
}

export default function TermsPage() {
  const lastUpdatedDate = 'August 27, 2024'
  const contactInformation = 'events@sanity.io'

  return (
    <>
      <section className="flex justify-center bg-white dark:bg-slate-950 font-serif">
        <div className="flex-grow max-w-3xl mt-16">
          <h1 className="text-2xl uppercase font-bold mb-4">Terms of Service for Sanity.io</h1>
          <p className="text-md text-gray-600">
            <em>Last Updated: {lastUpdatedDate}</em>
          </p>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service ("Terms") are a binding legal agreement between you and Sanity
              Inc., the owner and operator of Sanity.io website, mobile application, and other
              related services (collectively, "Sanity.io" or "Service"). By accessing or using the
              Service, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">2. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. All changes will be effective
              immediately upon posting to the Service and, by continuing to use the Service, you
              agree to be bound by the modified Terms.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">3. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Our Privacy Policy, incorporated into these Terms by
              reference, describes the collection, use, and disclosure of your data.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">4. Use of the Service</h2>
            <p>
              You agree to use the Service only for lawful purposes and in accordance with these
              Terms. You must not:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Post or transmit any content that is illegal, harmful, or offensive.</li>
              <li>Engage in any activity that disrupts or interferes with the Service.</li>
              <li>
                Attempt to gain unauthorized access to the Service or its related systems or
                networks.
              </li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">
              5. Intellectual Property Rights
            </h2>
            <p>
              The Service and its original content, features, and functionality are and will remain
              the exclusive property of Pine Creek Labs LLC and its licensors. You are granted a
              limited, non-exclusive, non-transferable license to access and use the Service for
              personal, non-commercial purposes.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">6. User Content</h2>
            <p>
              You may post, upload, or otherwise contribute content to the Service ("User Content").
              By providing User Content, you grant Pine Creek Labs LLC a worldwide, perpetual,
              irrevocable, non-exclusive, royalty-free license to use, reproduce, modify, and
              display such content.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">7. Third-Party Links</h2>
            <p>
              The Service may contain links to third-party websites or services that are not owned
              or controlled by Pine Creek Labs LLC. We are not responsible for the content,
              policies, or practices of any third party.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">8. Disclaimers</h2>
            <p>
              Sanity.io is provided on an "as is" and "as available" basis. Pine Creek Labs LLC
              makes no representations or warranties of any kind, express or implied, as to the
              operation of the Service or the information, content, or materials included therein.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">9. Limitation of Liability</h2>
            <p>
              In no event shall Pine Creek Labs LLC, its directors, employees, partners, agents,
              suppliers, or affiliates be liable for any indirect, incidental, special,
              consequential or punitive damages arising out of or in connection with your use of the
              Service.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase pb-2">10. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the
              jurisdiction in which Pine Creek Labs LLC is located, without regard to its conflict
              of law provisions.
            </p>
          </section>

          <section className="mt-6 mb-4">
            <h2 className="text-lg font-semibold uppercase pb-2">11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:{' '}
              <a
                href={`mailto:${contactInformation}`}
                className="text-blue-500 hover:text-blue-600"
              >
                {contactInformation}
              </a>
              .
            </p>
          </section>

          <p className="text-center py-4">
            By using Sanity.io, you acknowledge that you have read, understood, and agree to be
            bound by these Terms of Service.
          </p>
        </div>
      </section>
    </>
  )
}
