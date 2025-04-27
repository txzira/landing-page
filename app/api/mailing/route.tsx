import PGClient from "@/lib/db";

export async function GET() {
  const res = await fetch("https://data.mongodb-api.com/...", {
    headers: {
      "Content-Type": "application/json",
      // 'API-Key': process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  return Response.json({ data });
}

export async function POST(request: Request) {
  const formData = await request.json();
  const query = await PGClient.query(
    "Insert INTO members (first_name,middle_name,last_name, discord,instagram,email,phone,address,address_2,state,city,postal_code,country) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *;",
    [
      formData.first_name,
      formData.middle_name,
      formData.last_name,
      formData.discord,
      formData.instagram,
      formData.email,
      formData.phone,
      formData.address,
      formData.address_2,
      formData.state,
      formData.city,
      formData.postal_code,
      formData.country,
    ]
  );
  console.log(query.rows[0]);

  return Response.json({}, { status: 200 });
}
