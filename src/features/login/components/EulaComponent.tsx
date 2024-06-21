import React from 'react';

type Props = {
  OnClose: () => void;
};

const EulaComponent: React.FC<Props> = ({ OnClose }: Props) => {
  return (
    <div className=' w-auto mx-auto px-4 py-8 max-h-screen  fixed top-4 overflow-y-scroll'>
      <div className='bg-white shadow-md rounded-lg'>
        <div className='px-8 py-6 mb-8'>
          <h1 className='text-2xl font-bold mb-4'>
            End User License Agreement (EULA)
          </h1>
          <p className='text-gray-700 mb-4'>
            This End User License Agreement ("Agreement") governs your use of
            the LifePill software application ("Application") provided by
            LifePill ("Company"). By using the Application, you agree to be
            bound by the terms of this Agreement.
          </p>
          <h2 className='text-xl font-semibold mb-2'>License Grant</h2>
          <p className='text-gray-700 mb-4'>
            Subject to the terms of this Agreement, Company grants you a
            limited, non-exclusive, non-transferable license to use the
            Application solely for your personal, non-commercial purposes.
          </p>
          <h2 className='text-xl font-semibold mb-2'>Restrictions</h2>
          <p className='text-gray-700 mb-4'>
            You may not:
            <ul className='list-disc ml-8'>
              <li>
                Modify, adapt, translate, reverse engineer, decompile, or
                disassemble the Application.
              </li>
              <li>
                Attempt to bypass, modify, or tamper with any security features
                or measures of the Application.
              </li>
              <li>
                Use the Application in any manner that violates applicable laws
                or regulations.
              </li>
            </ul>
          </p>
          <h2 className='text-xl font-semibold mb-2'>Ownership</h2>
          <p className='text-gray-700 mb-4'>
            Company retains all rights, title, and interest in and to the
            Application, including all intellectual property rights.
          </p>
          <h2 className='text-xl font-semibold mb-2'>Privacy Policy</h2>
          <p className='text-gray-700 mb-4'>
            Your use of the Application is also governed by our Privacy Policy,
            available{' '}
            <a href='#privacy-policy' className='text-blue-500 underline'>
              here
            </a>
            . By using the Application, you consent to the collection and use of
            your information as described in the Privacy Policy.
          </p>
          <h2 className='text-xl font-semibold mb-2'>Termination</h2>
          <p className='text-gray-700 mb-4'>
            This Agreement is effective until terminated by you or Company.
            Company may terminate this Agreement at any time without notice if
            you fail to comply with any term of this Agreement. Upon
            termination, you must cease all use of the Application.
          </p>
          <h2 className='text-xl font-semibold mb-2'>
            Disclaimer of Warranties
          </h2>
          <p className='text-gray-700 mb-4'>
            THE APPLICATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. TO
            THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, COMPANY DISCLAIMS
            ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING
            BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
            PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
          <h2 className='text-xl font-semibold mb-2'>
            Limitation of Liability
          </h2>
          <p className='text-gray-700 mb-4'>
            IN NO EVENT SHALL COMPANY BE LIABLE FOR ANY INCIDENTAL, SPECIAL,
            INDIRECT, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATING TO THE
            USE OR INABILITY TO USE THE APPLICATION, WHETHER BASED ON WARRANTY,
            CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY,
            EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <h2 className='text-xl font-semibold mb-2'>Governing Law</h2>
          <p className='text-gray-700 mb-4'>
            This Agreement shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction], without regard to its conflict of
            law principles.
          </p>
          <h2 className='text-xl font-semibold mb-2'>
            Changes to this Agreement
          </h2>
          <p className='text-gray-700 mb-4'>
            Company reserves the right to modify this Agreement at any time. Any
            changes will be effective immediately upon posting of the revised
            Agreement. Your continued use of the Application after the posting
            of the revised Agreement constitutes your acceptance of the changes.
          </p>
          <h2 className='text-xl font-semibold mb-2'>Contact Us</h2>

          <p className='text-gray-700'>
            If you have any questions about this Agreement, please contact us at{' '}
            <a
              href='mailto:LifePillinfo@gmail.com'
              className='text-blue-500 underline'
            >
              LifePillinfo@gmail.com
            </a>
            .
          </p>
          <button
            className='bg-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md'
            onClick={OnClose}
          >
            Close
          </button>
        </div>

        {/* Close button */}
      </div>
    </div>
  );
};

export default EulaComponent;
