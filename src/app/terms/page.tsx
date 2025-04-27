import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function TermsPage() {
    return (
        <MainLayout>
            <div className="bg-gray-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>

                        <div className="prose prose-blue max-w-none">
                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Introduction</h2>
                            <p className="mb-4">
                                Welcome to Kwizify. These Terms of Service govern your use of our AI-powered quiz generation platform.
                                By accessing or using Kwizify, you agree to be bound by these Terms and our Privacy Policy.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. The Service</h2>
                            <p className="mb-4">
                                Kwizify is an AI-powered platform designed to process learning materials and automatically generate
                                multiple-choice questions. Our service includes:
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li className="mb-2">Processing of uploaded learning materials (PDFs, text files)</li>
                                <li className="mb-2">Keyword extraction using NLP techniques</li>
                                <li className="mb-2">Generation of multiple-choice quiz questions</li>
                                <li className="mb-2">Management and storage of created quizzes</li>
                                <li className="mb-2">User dashboard functionality</li>
                            </ul>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
                            <p className="mb-4">
                                To access our service, you must create an account with a valid email address and secure password.
                                You are responsible for maintaining the confidentiality of your account information and for all
                                activities that occur under your account.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. User Content</h2>
                            <p className="mb-4">
                                By uploading materials to Kwizify, you grant us a non-exclusive, worldwide, royalty-free license to use,
                                process, and analyze your content solely for the purpose of providing our service to you.
                            </p>
                            <p className="mb-4">
                                You represent and warrant that you have all necessary rights to the materials you upload and that your
                                content does not infringe on the intellectual property rights or other rights of any third party.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Acceptable Use</h2>
                            <p className="mb-4">
                                You agree not to use Kwizify:
                            </p>
                            <ul className="list-disc pl-6 mb-4">
                                <li className="mb-2">For any unlawful purpose or to violate any laws or regulations</li>
                                <li className="mb-2">To upload or share content that infringes on intellectual property rights</li>
                                <li className="mb-2">To transmit harmful code, malware, or disruptive material</li>
                                <li className="mb-2">To attempt to gain unauthorized access to any part of the service</li>
                                <li className="mb-2">To engage in any activity that interferes with or disrupts the service</li>
                            </ul>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
                            <p className="mb-4">
                                Kwizify and its content, features, and functionality are owned by Kwizify and are protected by copyright,
                                trademark, and other intellectual property laws. The AI-generated quizzes are provided for your personal,
                                educational use.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Limitation of Liability</h2>
                            <p className="mb-4">
                                Kwizify is provided on an &#34;as is&#34; and &#34;as available&#34; basis. We make no warranties, express or implied,
                                regarding the reliability, accuracy, or availability of the service. In no event shall Kwizify be liable
                                for any indirect, incidental, special, consequential, or punitive damages.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. AI-Generated Content</h2>
                            <p className="mb-4">
                                Our service uses AI to generate quiz questions. While we strive for accuracy and quality, we cannot
                                guarantee that all AI-generated content will be completely accurate or suitable for all educational
                                purposes. Users should review generated quizzes before use.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Termination</h2>
                            <p className="mb-4">
                                We reserve the right to suspend or terminate your access to Kwizify at our sole discretion, without
                                notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties,
                                or for any other reason.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Changes to Terms</h2>
                            <p className="mb-4">
                                We may revise these Terms at any time by updating this page. Your continued use of Kwizify after any
                                changes to the Terms constitutes your acceptance of the revised Terms.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. Governing Law</h2>
                            <p className="mb-4">
                                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction],
                                without regard to its conflict of law provisions.
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">12. Contact</h2>
                            <p className="mb-4">
                                If you have any questions about these Terms, please contact us at:
                                <br />
                                <a href="mailto:terms@kwizify.com" className="text-blue-600 hover:text-blue-800">
                                    terms@kwizify.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}