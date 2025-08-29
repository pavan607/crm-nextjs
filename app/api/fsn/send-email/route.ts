// // /app/api/fsn/send-email/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// interface Employee {
//   employee_id: string;
//   employee_first_name: string;
//   employee_last_name: string;
//   employee_email: string;
// }

// interface FSNData {
//   fsn_num: string;
//   fsn_date: string;
//   fsn_organization_name: string;
//   fsn_contact_name: string;
//   fsn_target_date?: string;
//   enquiry_number: string;
// }

// interface Product {
//   product_name: string;
//   product_type: string;
//   product_model_num: string;
//   fsn_product_qty: number;
//   fsn_comments?: string;
// }

// interface EmailRequestBody {
//   fsnId: string;
//   employeeId: string;
//   fsnData: FSNData;
//   products: Product[];
// }

// // Configure email transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or your email service
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// // Alternative SMTP configuration
// /*
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });
// */

// export async function POST(request: NextRequest) {
//   try {
//     const body: EmailRequestBody = await request.json();
//     const { employeeId, fsnData, products } = body;

//     if (!employeeId || !fsnData || !products) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // Fetch employee details
//     const employeeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fsn/employee/${employeeId}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!employeeResponse.ok) {
//       const errorText = await employeeResponse.text();
//       console.error('Failed to fetch employee:', employeeResponse.status, errorText);
//       throw new Error(`Failed to fetch employee details: ${employeeResponse.status}`);
//     }

//     const employee: Employee = await employeeResponse.json();

//     if (!employee.employee_email) {
//       return NextResponse.json({ error: 'Employee email not found' }, { status: 400 });
//     }

//     const emailSubject = `New FSN Assignment - ${fsnData.fsn_num}`;

//     const emailHtml = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
//             .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
//             .header { background-color: #2563eb; color: white; padding: 15px; border-radius: 8px 8px 0 0; text-align: center; }
//             .content { padding: 20px 0; }
//             .fsn-details { background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 15px 0; }
//             .products-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
//             .products-table th, .products-table td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
//             .products-table th { background-color: #f1f5f9; }
//             .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <div class="header">
//               <h2>New FSN Assignment</h2>
//             </div>
//             <div class="content">
//               <p>Dear ${employee.employee_first_name} ${employee.employee_last_name},</p>
//               <p>You have been assigned to work on a new Feasibility Study Note (FSN). Please review the details below:</p>
//               <div class="fsn-details">
//                 <h3>FSN Details:</h3>
//                 <p><strong>FSN Number:</strong> ${fsnData.fsn_num}</p>
//                 <p><strong>FSN Date:</strong> ${new Date(fsnData.fsn_date).toLocaleDateString()}</p>
//                 <p><strong>Organization:</strong> ${fsnData.fsn_organization_name}</p>
//                 <p><strong>Contact:</strong> ${fsnData.fsn_contact_name}</p>
//                 <p><strong>Target Date:</strong> ${fsnData.fsn_target_date ? new Date(fsnData.fsn_target_date).toLocaleDateString() : 'Not specified'}</p>
//                 <p><strong>Enquiry Number:</strong> ${fsnData.enquiry_number}</p>
//               </div>
//               <h3>Assigned Products:</h3>
//               <table class="products-table">
//                 <thead>
//                   <tr>
//                     <th>Product Name</th>
//                     <th>Type</th>
//                     <th>Model Number</th>
//                     <th>Quantity</th>
//                     <th>Comments</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   ${products.map((product: Product) => `
//                     <tr>
//                       <td>${product.product_name || 'N/A'}</td>
//                       <td>${product.product_type || 'N/A'}</td>
//                       <td>${product.product_model_num || 'N/A'}</td>
//                       <td>${product.fsn_product_qty || 0}</td>
//                       <td>${product.fsn_comments || 'No comments'}</td>
//                     </tr>
//                   `).join('')}
//                 </tbody>
//               </table>
//               <p>Please log into the system to view complete details and provide your feasibility analysis.</p>
//               <p>If you have any questions, please contact your supervisor or the marketing team.</p>
//               <p>Best regards,<br>FSN Management System</p>
//             </div>
//             <div class="footer">
//               <p>This is an automated email. Please do not reply to this message.</p>
//               <p>Generated on: ${new Date().toLocaleString()}</p>
//             </div>
//           </div>
//         </body>
//       </html>
//     `;

//     const emailText = `
//       Dear ${employee.employee_first_name} ${employee.employee_last_name},
//       You have been assigned to work on a new Feasibility Study Note (FSN).
//       FSN Details:
//       - FSN Number: ${fsnData.fsn_num}
//       - FSN Date: ${new Date(fsnData.fsn_date).toLocaleDateString()}
//       - Organization: ${fsnData.fsn_organization_name}
//       - Contact: ${fsnData.fsn_contact_name}
//       - Target Date: ${fsnData.fsn_target_date ? new Date(fsnData.fsn_target_date).toLocaleDateString() : 'Not specified'}
//       - Enquiry Number: ${fsnData.enquiry_number}
//       Assigned Products:
//       ${products.map((product: Product) => `- ${product.product_name} (${product.product_type}) - Qty: ${product.fsn_product_qty}`).join('\n')}
//       Please log into the system to view complete details and provide your feasibility analysis.
//       Best regards,
//       FSN Management System
//     `;

//     const mailOptions = {
//       from: `"FSN Management System" <${process.env.EMAIL_USER}>`,
//       to: employee.employee_email,
//       subject: emailSubject,
//       text: emailText,
//       html: emailHtml,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully:', info.messageId);

//     return NextResponse.json({
//       success: true,
//       message: 'Email sent successfully',
//       recipientEmail: employee.employee_email,
//       messageId: info.messageId,
//     });

//   } catch (error) {
//     console.error('Error sending email:', error);
//     return NextResponse.json(
//       { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }
