"use client";

import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Privacy Policy
      </h1>
      <p className="mt-4 text-gray-600 text-center">
        Last updated: [Insert Date]
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 mt-2">
          We collect personal information such as your name, email, phone
          number, shipping address, and payment details when you interact with
          our services.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
          <li>To process and fulfill your orders.</li>
          <li>To provide customer support and respond to inquiries.</li>
          <li>To improve our products and services.</li>
          <li>To send updates, promotions, and marketing communications.</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          3. Data Security
        </h2>
        <p className="text-gray-700 mt-2">
          We implement security measures to protect your personal data from
          unauthorized access, disclosure, or misuse.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          4. Sharing Your Information
        </h2>
        <p className="text-gray-700 mt-2">
          We do not sell your personal information. However, we may share it
          with third-party services to facilitate payments, deliveries, and
          analytics.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">5. Your Rights</h2>
        <p className="text-gray-700 mt-2">
          You have the right to access, update, or delete your personal data.
          You can contact us for any requests related to your privacy.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          6. Changes to This Policy
        </h2>
        <p className="text-gray-700 mt-2">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>
      </section>

      <section className="mt-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800">7. Contact Us</h2>

        <p className="text-gray-700 mt-2">
          If you have any questions about these Privacy Policy, please contact
          us at{" "}
          <a
            href="mailto:wahajqamar125@gmail.com"
            className="text-blue-600 hover:underline"
          >
            wahajqamar125@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
