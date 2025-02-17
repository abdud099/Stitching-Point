"use client";

import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Terms of Service
      </h1>
      <p className="mt-4 text-gray-600 text-center">
        Last updated: [Insert Date]
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">1. Introduction</h2>
        <p className="text-gray-700 mt-2">
          Welcome to Stitching Store! These Terms of Service govern your use of
          our website and services. By accessing or using our platform, you
          agree to be bound by these terms.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          2. User Accounts
        </h2>
        <p className="text-gray-700 mt-2">
          To access certain features, you may need to create an account. You are
          responsible for maintaining the confidentiality of your account
          information.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          3. Orders & Payments
        </h2>
        <p className="text-gray-700 mt-2">
          All orders placed on Stitching Store are subject to availability and
          confirmation of payment. We reserve the right to cancel any order if
          necessary.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          4. Returns & Refunds
        </h2>
        <p className="text-gray-700 mt-2">
          Please review our refund policy before making a purchase. We accept
          returns within [X] days of delivery under specific conditions.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          5. Prohibited Activities
        </h2>
        <p className="text-gray-700 mt-2">
          Users may not engage in activities such as fraud, unauthorized access,
          or misuse of content on our platform. Violation of these terms may
          result in account termination.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          6. Changes to Terms
        </h2>
        <p className="text-gray-700 mt-2">
          We may update these Terms of Service at any time. It is your
          responsibility to review them periodically for any changes.
        </p>
      </section>

      <section className="mt-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800">7. Contact Us</h2>
        <p className="text-gray-700 mt-2">
          If you have any questions about these Terms of Service, please contact
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
