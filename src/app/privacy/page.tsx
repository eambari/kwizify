import React from 'react';

export default function PrivacyPage() {
    return (
            <div className="bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

                        <div className="prose prose-blue max-w-none">
                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
                            <p className="mb-4">
                                Welcome to Kwizify. We respect your privacy and are committed to protecting your personal data.
                                This Privacy Policy explains how we collect, use, and safeguard your information when you use our
                                AI-powered quiz generation platform.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Information We Collect</h2>
                            <p className="mb-4">
                                <strong>Personal Information:</strong> When you create an account, we collect your username, email address,
                                and password (stored in encrypted form).
                            </p>
                            <p className="mb-4">
                                <strong>Content Data:</strong> We process the learning materials (PDFs, text files) that you upload to
                                generate quizzes. This data is used solely for providing our service.
                            </p>
                            <p className="mb-4">
                                <strong>Usage Information:</strong> We collect information about how you interact with our platform,
                                including quizzes created, results, and usage patterns.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. How We Use Your Information</h2>
                            <ul className="list-disc pl-6 mb-4">
                                <li className="mb-2">To provide and maintain our service</li>
                                <li className="mb-2">To create and manage your account</li>
                                <li className="mb-2">To generate quiz content based on your uploaded materials</li>
                                <li className="mb-2">To improve our algorithms and service quality</li>
                                <li className="mb-2">To respond to your requests or inquiries</li>
                                <li className="mb-2">To send you service-related notifications</li>
                            </ul>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
                            <p className="mb-4">
                                We implement appropriate security measures to protect your personal information. These include:
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li className="mb-2">Secure JWT authentication</li>
                                <li className="mb-2">Encrypted password storage</li>
                                <li className="mb-2">Secure data transmission protocols</li>
                                <li className="mb-2">Regular security audits and updates</li>
                            </ul>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Data Retention</h2>
                            <p className="mb-4">
                                We retain your personal information for as long as necessary to provide our services and fulfill the purposes
                                outlined in this Privacy Policy. You can request deletion of your account and associated data at any time.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Third-Party Services</h2>
                            <p className="mb-4">
                                We use Gemini AI for quiz generation. Your content is processed according to Google&#39;s privacy policies
                                and data processing terms. We ensure that all third-party services maintain appropriate security and
                                privacy standards.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Your Rights</h2>
                            <p className="mb-4">
                                Depending on your location, you may have certain rights regarding your personal information, including:
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li className="mb-2">The right to access your personal information</li>
                                <li className="mb-2">The right to correct inaccurate information</li>
                                <li className="mb-2">The right to delete your information</li>
                                <li className="mb-2">The right to restrict or object to processing</li>
                                <li className="mb-2">The right to data portability</li>
                            </ul>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Children&#39;s Privacy</h2>
                            <p className="mb-4">
                                Our service is not directed to individuals under the age of 16. We do not knowingly collect personal
                                information from children. If you believe we have inadvertently collected data from a child,
                                please contact us immediately.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Changes to This Privacy Policy</h2>
                            <p className="mb-4">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                                new Privacy Policy on this page and updating the &#34;Last Updated&#34; date.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Contact Us</h2>
                            <p className="mb-4">
                                If you have any questions about this Privacy Policy, please contact us at:
                                <br />
                                <a href="mailto:privacy@kwizify.com" className="text-blue-600 hover:text-blue-800">
                                    privacy@kwizify.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    );
}