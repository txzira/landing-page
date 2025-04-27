import React from "react";

const TermsAndConditionModal = () => {
  return (
    <div>
      <h2>Terms & Agreement</h2>
      <p>
        By submitting your information on this page, you agree to the following:
      </p>
      <ol>
        <li>
          <h2>Privacy & Data</h2>
          <p>
            Protection Your privacy is important. The personal data you submit
            (such as your name and email address) will be securely stored and
            will not be sold, shared, or used for any third-party advertising.
          </p>
        </li>
        <li>
          <h2>Use of Information</h2>
          <p>
            Your information will be used solely for communication related to:
          </p>
          <ul>
            <li>
              Updates and announcements from the official Logic Discord server
            </li>
            <li>Perks and benefits included with your membership</li>
            <li>News, content, or exclusive offers related to Logic</li>
          </ul>
        </li>
        <li>
          Email Communication You may receive emails from us regarding new
          features, community events, or special member-only perks. You can
          unsubscribe from these at any time via the link provided in the email.
        </li>
        <li>
          Security We take your data security seriously and implement
          appropriate measures to protect your information from unauthorized
          access.
        </li>
        <li>
          Changes to Terms These terms may be updated occasionally to reflect
          changes in how we operate. Continued use of the service after changes
          constitutes your acceptance of the updated terms.
        </li>
      </ol>
    </div>
  );
};

export default TermsAndConditionModal;
