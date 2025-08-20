// app/enquiry/view/[enquiryId]/page.tsx
import React from 'react';

type Attachment = { file_name: string; file_path: string };
type Comment = { comment_text: string; commented_on: string; commented_by_name: string };
type Product = { product_name: string };

type Lead = {
  enquiryId: number;
  opportunityName: string;
  contactName?: string;
  type?: string;
  leadSource?: string;
  assignedToName?: string;
  campaignSource?: string;
  weightedRevenue?: number;
  organizationName?: string;
  amount?: number;
  expectedCloseDate?: string;
  nextStep?: string;
  salesStage?: string;
  probability?: number;
  description?: string;
  attachments?: Attachment[];
  comments?: Comment[];
  products?: Product[];
};

type ApiLead = {
  crm_enquiry_id: number;
  crm_opportunity_name: string;
  crm_contact_name?: string;
  crm_type?: string;
  crm_lead_source?: string;
  assignedToName?: string;
  crm_campaign_source?: string;
  crm_weighted_revenue?: number;
  crm_organization_name?: string;
  crm_amount?: number;
  crm_expected_close_date?: string;
  crm_next_step?: string;
  crm_sales_stage?: string;
  crm_probability?: number;
  crm_description?: string;
  attachments?: Attachment[];
  comments?: Comment[];
  products?: Product[];
};

interface Props {
  params: { enquiryId: string };
}

// Server-side data fetch
async function getLead(enquiryId: string): Promise<Lead | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/enquiry/view/${enquiryId}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data: ApiLead = await res.json();
    return {
      enquiryId: data.crm_enquiry_id,
      opportunityName: data.crm_opportunity_name,
      contactName: data.crm_contact_name,
      type: data.crm_type,
      leadSource: data.crm_lead_source,
      assignedToName: data.assignedToName,
      campaignSource: data.crm_campaign_source,
      weightedRevenue: data.crm_weighted_revenue,
      organizationName: data.crm_organization_name,
      amount: data.crm_amount,
      expectedCloseDate: data.crm_expected_close_date,
      nextStep: data.crm_next_step,
      salesStage: data.crm_sales_stage,
      probability: data.crm_probability,
      description: data.crm_description,
      attachments: data.attachments,
      comments: data.comments,
      products: data.products,
    };
  } catch (err) {
    console.error('Failed to fetch lead:', err);
    return null;
  }
}


export default async function LeadDetailPage({ params }: Props) {
  const lead = await getLead(params.enquiryId);

  const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleString() : '—';

  if (!lead) return <p className="text-red-600 p-4">Lead not found.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{lead.opportunityName}</h1>
      <p><strong>Contact:</strong> {lead.contactName || '—'}</p>
      <p><strong>Type:</strong> {lead.type || '—'}</p>
      <p><strong>Lead Source:</strong> {lead.leadSource || '—'}</p>
      <p><strong>Assigned To:</strong> {lead.assignedToName || '—'}</p>
      <p><strong>Campaign Source:</strong> {lead.campaignSource || '—'}</p>
      <p><strong>Weighted Revenue:</strong> {lead.weightedRevenue ?? '—'}</p>
      <p><strong>Organization:</strong> {lead.organizationName || '—'}</p>
      <p><strong>Amount:</strong> {lead.amount ?? '—'}</p>
      <p><strong>Expected Close Date:</strong> {formatDate(lead.expectedCloseDate)}</p>
      <p><strong>Next Step:</strong> {lead.nextStep || '—'}</p>
      <p><strong>Sales Stage:</strong> {lead.salesStage || '—'}</p>
      <p><strong>Probability:</strong> {lead.probability ?? '—'}</p>
      <p><strong>Description:</strong> {lead.description || '—'}</p>

      {/* Comments */}
      <section className="mt-6">
        <h2 className="font-semibold mb-2">Comments:</h2>
        {lead.comments?.length ? (
          <ul className="list-disc ml-5">
            {lead.comments.map((c, i) => (
              <li key={i}>
                <p>{c.comment_text}</p>
                <small>— {c.commented_by_name}, {formatDate(c.commented_on)}</small>
              </li>
            ))}
          </ul>
        ) : <p>—</p>}
      </section>

      {/* Products */}
      <section className="mt-6">
        <h2 className="font-semibold mb-2">Products:</h2>
        {lead.products?.length ? (
          <ul className="list-disc ml-5">
            {lead.products.map((p, i) => (
              <li key={i}>{p.product_name}</li>
            ))}
          </ul>
        ) : <p>—</p>}
      </section>

      {/* Attachments */}
      <section className="mt-6">
        <h2 className="font-semibold mb-2">Attachments:</h2>
        {lead.attachments?.length ? (
          <ul className="list-disc ml-5">
            {lead.attachments.map((a, i) => (
              <li key={i}>
                <a
                  href={a.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {a.file_name}
                </a>
              </li>
            ))}
          </ul>
        ) : <p>—</p>}
      </section>
    </div>
  );
}
