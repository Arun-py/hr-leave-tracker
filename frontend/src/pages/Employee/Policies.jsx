import React from 'react';
import { FiFileText, FiInfo, FiAlertCircle } from 'react-icons/fi';

const Policies = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
          Company Leave Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Official leave policy guidelines for all employees
        </p>
      </div>

      {/* Official Document */}
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-lg p-8 border border-gray-200 dark:border-dark-border">
        {/* Document Header */}
        <div className="border-b-2 border-orange-500 pb-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Company Leave Policy for Employees
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Official Document</p>
        </div>

        {/* 1. Purpose */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
            <FiInfo className="mr-2" /> 1. Purpose
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This policy outlines the rules and regulations governing all types of employee leave.
            It ensures that employees take adequate rest while maintaining operational continuity and discipline in attendance.
          </p>
        </section>

        {/* 2. General Conditions */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
            2. General Conditions
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Leave is a privilege, not a right. It is granted at the discretion of the management based on organizational needs.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>All leaves must be applied through the HR Leave Tracker system.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Leave must be approved before availing, except in emergencies such as sudden illness.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Absence without prior approval will be treated as Leave Without Pay (LWP) or unauthorized absence, subject to disciplinary action.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Employees must apply at least one day in advance for all leaves except Sick Leave.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>The organization reserves the right to reject or modify leave requests depending on workload or staffing requirements.</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>If an employee remains absent for more than 5 consecutive working days without information, it may be considered voluntary abandonment of service.</span>
            </li>
          </ul>
        </section>

        {/* 3. Leave Categories */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
            3. Leave Categories and Entitlements
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">Leave Type</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">Annual Entitlement</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold">Conditions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">Casual Leave (CL)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">8 days</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">For short personal reasons. Cannot exceed 3 days at a stretch. Not carried forward.</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/30">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">Sick Leave (SL)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">12 days</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">For illness or medical treatment. Medical certificate required for absences &gt;2 days.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">Earned Leave (EL)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">30 days</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Accumulated monthly. Can be carried forward up to 300 days or encashed.</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/30">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">Maternity Leave</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">26 weeks</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">For female employees (as per Maternity Benefit Act, 1961).</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">Paternity Leave</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">15 days</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">For male employees, within 6 months of childbirth.</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/30">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">Compensatory Off (Comp-Off)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Equivalent to extra days worked</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Must be availed within 60 days from date of approval.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">Restricted Holidays (RH)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">2 days</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Can choose any 2 optional holidays from the approved list.</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/30">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">Leave Without Pay (LWP)</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Unlimited</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">Applicable when all other leave balances are exhausted. Salary deduction applies.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4-12. Additional Sections */}
        {[
          {
            title: '4. Application & Approval Rules',
            items: [
              'Leave must be submitted in the system with clear from and to dates, and reason for leave.',
              'Once submitted, the request goes through the following workflow: Employee → Reporting Manager / HR → Admin (if needed).',
              'Auto alerts will be sent for pending approvals and leave balance updates.',
              'Employees must not leave the workplace until their leave is approved in the system.'
            ]
          },
          {
            title: '5. Public Holidays and Sundays',
            items: [
              'Official public holidays and Sundays are not counted as part of leave duration.',
              'If an employee extends leave before and after a public holiday, it may be treated as continuous leave.'
            ]
          },
          {
            title: '6. Late or Missed Attendance',
            items: [
              'Employees arriving late more than 3 times a month may face half-day leave deduction from their Casual Leave balance.',
              'Continuous late reporting without valid reason may invite HR action.'
            ]
          },
          {
            title: '7. Leave Encashment & Carry Forward',
            items: [
              'Only Earned Leave is eligible for carry forward or encashment.',
              'Casual and Sick Leave lapse automatically at the end of the calendar year.',
              'Encashment, if allowed, will be calculated on basic pay as per HR guidelines.'
            ]
          },
          {
            title: '8. Cancellation & Modification of Leave',
            items: [
              'Leave may be cancelled or rescheduled by the employee before the start date.',
              'Once leave has commenced, cancellation requests will not be accepted.',
              'The organization reserves the right to recall employees from leave in case of emergencies.'
            ]
          },
          {
            title: '9. Medical Leave & Certificate Rules',
            items: [
              'Sick Leave beyond 2 consecutive days requires a medical certificate.',
              'Employees returning from medical leave must produce a fitness certificate if required.',
              'Repeated misuse of Sick Leave will be considered misconduct.'
            ]
          },
          {
            title: '10. Disciplinary Provisions',
            items: [
              'Unauthorized leave, false claims, or repeated absenteeism will lead to:',
              '  - Deduction of pay',
              '  - Loss of leave benefits',
              '  - Disciplinary action, up to suspension or termination in serious cases.'
            ]
          },
          {
            title: '11. Yearly Reset',
            items: [
              'Leave balances reset on January 1st every year.',
              'System automatically updates new quotas and archives old records.'
            ]
          }
        ].map((section, index) => (
          <section key={index} className="mb-8">
            <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
              {section.title}
            </h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* 12. Acknowledgment */}
        <section className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
          <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
            <FiAlertCircle className="mr-2" /> 12. Acknowledgment
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            All employees are required to read and understand this policy.
            By continuing employment and using the HR Leave Tracker system, employees are deemed to have accepted and agreed to abide by these leave rules.
          </p>
        </section>

        {/* 13. Effective Date */}
        <section className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
            13. Effective Date
          </h3>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            This policy is effective from <span className="text-orange-600 dark:text-orange-400 font-bold">1st January 2025</span> and supersedes all previous leave-related policies.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Policies;
