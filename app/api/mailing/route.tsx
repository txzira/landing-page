import { DataBaseError } from "@/app/types/DatabaseError";
import PGClient from "@/lib/db";
import { SendEmail } from "@/lib/nodemailer";

export async function GET() {
  return Response.json({ message: "" });
}

export async function POST(request: Request) {
  const formData = await request.json();
  try {
    //Insert Data
    const insertMemberQuery = await PGClient.query(
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
    const dbRowResponse = insertMemberQuery.rows[0];
    const insertMemberSizingQuery = await PGClient.query(
      "INSERT INTO members_sizing (hat_size,shirt_size,pants_size,footwear_size,member) VALUES ($1, $2, $3, $4,$5) RETURNING *;",
      [
        formData.hat_size,
        formData.shirt_size,
        formData.pants_size,
        formData.footwear_size,
        dbRowResponse.id,
      ]
    );
    console.log(insertMemberQuery.rows[0]);
    console.log(insertMemberSizingQuery.rows[0]);

    //Send confirmation email
    const emailHtml = `<div style="width:75%; margin:0 auto; color:black;">
      <div style="text-align:center;">
        <img width="250px" height="250px" src="${process.env.COMPANY_LOGO}" alt="logo"/>
      </div>
      <p>Hello ${formData.first_name},</p>
      <br/>
      <br/>
      <hr/>
      <br/>
      <h2>Member Submitted Information</h2>
      <br/>
      <hr/>
      <br/>
      <div style="display:flex; width:100%;">
        <div style="margin-right: 150px;">
          <div>
            <p style="margin:0;">${formData.first_name} ${formData.last_name}</p>
          </div>
          <table>
          <tr>
            <td>First Name:</td>
            <td>${formData.first_name}</td>
          </tr>
          <tr>
            <td>Middle Name:</td>
            <td>${formData.middle_name}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>${formData.last_name}</td>
          </tr>
          </table>
        </div>
      </div>
      <div style="display:flex; width:100%; ">
        

      </div>



      </div>
      `;
    // <p>-Your favorite shreders at ${process.env.COMPANY_NAME}</p>

    SendEmail(
      formData.email,
      `${formData.first_name} ${
        formData.middle_name ? formData.middle_name + " " : ""
      }${formData.last_name}`,
      "Logic Discord Sign Up Confirmation Email",
      emailHtml
    );
    // Return success

    return Response.json({ message: "" }, { status: 200 });
  } catch (err) {
    const error = err as DataBaseError;
    if (error.code === "23505") {
      return Response.json(
        {
          message: "Email already taken. Contact support if this is not you.",
        },
        { status: 400 }
      );
    }
    return Response.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}

// Subject: Rattpack Verified. 🚨
// Body:
// We’ve officially got you in the system.
// Your info is secure, and you’re now on the list for monthly perks, mystery drops, and exclusive Premium Member content.
// This is what being part of the Rattpack is all about.
// Welcome to the next level.
// —The Logic Discord Team
