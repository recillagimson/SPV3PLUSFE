import * as React from 'react';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Select from 'app/components/Elements/Select';

export function DataPrivacyConsent() {
  const [language, setLanguage] = React.useState('English');
  return (
    <ProtectedContent>
      <Box
        title="Privacy Policy"
        titleBorder
        withPadding
        titleAction={
          <Select
            style={{ borderColor: 'transparent' }}
            value={language}
            onChange={e => {
              setLanguage(e.currentTarget.value);
            }}
          >
            <option value="English">English</option>
          </Select>
        }
      >
        {{
          English: (
            <>
              <p>
                <b>I. Statement of Policy</b>
              </p>
              <p>
                SquidPay is committed to protect and respect your personal data
                privacy. As such, all Personal Data collected from clients and
                customers are processed in adherence to the general principles
                of transparency, legitimate purpose, and proportionality. Thus,
                any collection and processing of Personal Data shall comply with
                the Data Privacy Act of 2012, its Implementing Rules and
                Regulations, and other relevant policies, including issuances of
                the National Privacy Commission.
              </p>
              <p>
                <b>II. Personal Data Collected</b>
              </p>
              <p>
                SquidPay may collect the basic contact information of users and
                customers, including their full name, address, email address and
                contact number. The collection may be made manually or
                electronically, including, but not limited to, when users visit
                our site, register on the site, and in connection with other
                activities, services, features or resources we make available on
                our site.
              </p>
              <p>
                <b>III. Use of Personal Data</b>
              </p>
              <p>
                SquidPay shall collect and process Personal Data necessary for
                the proper execution of its business, particularly for the
                following purposes:
              </p>
              <p>
                To respond to inquiries about our system and requests for
                information materials;
              </p>
              <p>To process account verification;</p>
              <p>
                To properly implement maintenance support and marketing research
                in relation to Squidpay’s business;
              </p>
              <p>To perform other tasks related to our business;</p>
              <p>
                With the customer’s consent, to send promotional e-mails to
                inform customers of various SquidPay events and programs; and
              </p>
              <p>
                With the customer’s consent, to share information to third
                parties limited to the purpose and subject to its reasonable
                use.
              </p>
              <p>
                <b>IV. Management and Protection</b>
              </p>
              <p>
                SquidPay shall ensure that Personal Data under its custody are
                protected against any accidental, unauthorized, or unlawful
                disclosure, destruction, alteration, as well as against any
                other accidental, unauthorized, or unlawful processing. SquidPay
                shall conduct appropriate and strict security measures in
                storing Personal Data, depending on its nature.
              </p>
              <p>
                This notwithstanding, kindly remember that no method of
                transmission over the Internet, or method of electronic storage
                is 100% secure. While we strive to use commercially acceptable
                means to protect your Personal Data, we cannot guarantee its
                absolute security.
              </p>
              <p>V. Access</p>
              <p>
                Due to the sensitive and confidential nature of the Personal
                Data collected, SquidPay shall implement appropriate security
                measures that limit access to Personal Data. Therefore, except
                as otherwise ordered by a competent court, only the customer to
                whom the Personal Data belongs to and SquidPay’s authorized
                personnel are allowed access to Personal Data stored. Any
                request for access to the Personal Data in SquidPay’s system
                must be made reasonably and for a legitimate purpose.
              </p>
              <p>
                <b>VI. Disclosure</b>
              </p>
              <p>
                All employees and personnel of SquidPay shall maintain the
                confidentiality and secrecy of all Personal Data that come to
                their knowledge and possession, even after their resignation or
                termination.
              </p>
              <p>
                Personal Data stored by SquidPay shall only be disclosed when
                based upon a lawful purpose, and only to persons entitled to its
                disclosure, and upon verification of the requestor’s identity.
              </p>
              <p>
                <b>VII. Correction, Addition, Deletion</b>
              </p>
              <p>
                SquidPay recognizes the right of its customers to rectify or
                delete Personal Data upon their instance or upon the termination
                of the specific purpose for which the information was collected.
              </p>
              <p>
                As such, SquidPay shall continue to retain the Personal Data of
                its clients and customers for as long as required by their
                business. After which, Personal Data which is no longer
                necessary shall be properly disposed of for a period of not more
                than ten (10) years after the purpose for which the Personal
                Data was collected ceases.
              </p>
              <p>
                SquidPay further ensures that all requests for correction,
                addition, and deletion shall undergo proper identity
                authentication procedures. The request shall be accomplished
                within a reasonable time.
              </p>
              <p>
                <b>VIII. Breach Notification</b>
              </p>
              <p>
                SquidPay implements appropriate procedures for the management of
                a Personal Information Breach and/or Security Incident. A Breach
                Response Team shall duly act, assess, and submit the appropriate
                report to those concerned.
              </p>
              <p>
                <b>IX. Use of Cookies</b>
              </p>
              <p>
                Cookies are files with small amount of data, which may include
                an anonymous unique identifier. Like many sites, SquidPay uses
                “cookies” to collect information. By using SquidPay’s website
                (https://www.squid.ph), you consent to the use of cookies in
                accordance with this Privacy Policy.
              </p>
              <p>
                <b>X. Inquiries and Complaints</b>
              </p>
              <p>
                Customers and clients may inquire or request for information
                regarding any matter relating to the processing of their
                Personal Data under the custody of SquidPay, including the data
                privacy and security policies implemented to ensure the
                protection and integrity of their Personal Data.
              </p>
              <p>
                For any concerns, including questions about this Privacy Policy,
                you may contact our Data Protection Officer via e-mail at
                legal@squid.ph.
              </p>
              <p>
                <b>XI. Changes to Our Privacy Policy</b>
              </p>
              <p>
                SquidPay may update the contents of this Privacy Policy from
                time to time to reflect changes to our information practice. Any
                such change will be posted on this page. We encourage you to
                periodically review this Privacy Policy for the latest
                information on our privacy practices. Notwithstanding any
                changes, Squidpay recognizes the right of the users to exercise
                their rights under the Data Privacy Act.
              </p>
              <p>
                <b>XII. Effectivity</b>
              </p>
              <p>
                This Privacy Policy is effective this 26th day of May 2020 until
                revoked or amended by SquidPay
              </p>
            </>
          ),
        }[language] || (
          <>
            <p>
              <b>I. Statement of Policy</b>
            </p>
            <p>
              SquidPay is committed to protect and respect your personal data
              privacy. As such, all Personal Data collected from clients and
              customers are processed in adherence to the general principles of
              transparency, legitimate purpose, and proportionality. Thus, any
              collection and processing of Personal Data shall comply with the
              Data Privacy Act of 2012, its Implementing Rules and Regulations,
              and other relevant policies, including issuances of the National
              Privacy Commission.
            </p>
            <p>
              <b>II. Personal Data Collected</b>
            </p>
            <p>
              SquidPay may collect the basic contact information of users and
              customers, including their full name, address, email address and
              contact number. The collection may be made manually or
              electronically, including, but not limited to, when users visit
              our site, register on the site, and in connection with other
              activities, services, features or resources we make available on
              our site.
            </p>
            <p>
              <b>III. Use of Personal Data</b>
            </p>
            <p>
              SquidPay shall collect and process Personal Data necessary for the
              proper execution of its business, particularly for the following
              purposes:
            </p>
            <p>
              To respond to inquiries about our system and requests for
              information materials;
            </p>
            <p>To process account verification;</p>
            <p>
              To properly implement maintenance support and marketing research
              in relation to Squidpay’s business;
            </p>
            <p>To perform other tasks related to our business;</p>
            <p>
              With the customer’s consent, to send promotional e-mails to inform
              customers of various SquidPay events and programs; and
            </p>
            <p>
              With the customer’s consent, to share information to third parties
              limited to the purpose and subject to its reasonable use.
            </p>
            <p>
              <b>IV. Management and Protection</b>
            </p>
            <p>
              SquidPay shall ensure that Personal Data under its custody are
              protected against any accidental, unauthorized, or unlawful
              disclosure, destruction, alteration, as well as against any other
              accidental, unauthorized, or unlawful processing. SquidPay shall
              conduct appropriate and strict security measures in storing
              Personal Data, depending on its nature.
            </p>
            <p>
              This notwithstanding, kindly remember that no method of
              transmission over the Internet, or method of electronic storage is
              100% secure. While we strive to use commercially acceptable means
              to protect your Personal Data, we cannot guarantee its absolute
              security.
            </p>
            <p>V. Access</p>
            <p>
              Due to the sensitive and confidential nature of the Personal Data
              collected, SquidPay shall implement appropriate security measures
              that limit access to Personal Data. Therefore, except as otherwise
              ordered by a competent court, only the customer to whom the
              Personal Data belongs to and SquidPay’s authorized personnel are
              allowed access to Personal Data stored. Any request for access to
              the Personal Data in SquidPay’s system must be made reasonably and
              for a legitimate purpose.
            </p>
            <p>
              <b>VI. Disclosure</b>
            </p>
            <p>
              All employees and personnel of SquidPay shall maintain the
              confidentiality and secrecy of all Personal Data that come to
              their knowledge and possession, even after their resignation or
              termination.
            </p>
            <p>
              Personal Data stored by SquidPay shall only be disclosed when
              based upon a lawful purpose, and only to persons entitled to its
              disclosure, and upon verification of the requestor’s identity.
            </p>
            <p>
              <b>VII. Correction, Addition, Deletion</b>
            </p>
            <p>
              SquidPay recognizes the right of its customers to rectify or
              delete Personal Data upon their instance or upon the termination
              of the specific purpose for which the information was collected.
            </p>
            <p>
              As such, SquidPay shall continue to retain the Personal Data of
              its clients and customers for as long as required by their
              business. After which, Personal Data which is no longer necessary
              shall be properly disposed of for a period of not more than ten
              (10) years after the purpose for which the Personal Data was
              collected ceases.
            </p>
            <p>
              SquidPay further ensures that all requests for correction,
              addition, and deletion shall undergo proper identity
              authentication procedures. The request shall be accomplished
              within a reasonable time.
            </p>
            <p>
              <b>VIII. Breach Notification</b>
            </p>
            <p>
              SquidPay implements appropriate procedures for the management of a
              Personal Information Breach and/or Security Incident. A Breach
              Response Team shall duly act, assess, and submit the appropriate
              report to those concerned.
            </p>
            <p>
              <b>IX. Use of Cookies</b>
            </p>
            <p>
              Cookies are files with small amount of data, which may include an
              anonymous unique identifier. Like many sites, SquidPay uses
              “cookies” to collect information. By using SquidPay’s website
              (https://www.squid.ph), you consent to the use of cookies in
              accordance with this Privacy Policy.
            </p>
            <p>
              <b>X. Inquiries and Complaints</b>
            </p>
            <p>
              Customers and clients may inquire or request for information
              regarding any matter relating to the processing of their Personal
              Data under the custody of SquidPay, including the data privacy and
              security policies implemented to ensure the protection and
              integrity of their Personal Data.
            </p>
            <p>
              For any concerns, including questions about this Privacy Policy,
              you may contact our Data Protection Officer via e-mail at
              legal@squid.ph.
            </p>
            <p>
              <b>XI. Changes to Our Privacy Policy</b>
            </p>
            <p>
              SquidPay may update the contents of this Privacy Policy from time
              to time to reflect changes to our information practice. Any such
              change will be posted on this page. We encourage you to
              periodically review this Privacy Policy for the latest information
              on our privacy practices. Notwithstanding any changes, Squidpay
              recognizes the right of the users to exercise their rights under
              the Data Privacy Act.
            </p>
            <p>
              <b>XII. Effectivity</b>
            </p>
            <p>
              This Privacy Policy is effective this 26th day of May 2020 until
              revoked or amended by SquidPay
            </p>
          </>
        )}
      </Box>
    </ProtectedContent>
  );
}
