import * as XLSX from "xlsx";

export function exportAdmissionsToExcel(applications: any[]) {
  const data = applications.map((app, index) => ({
    "S.No": index + 1,
    "Registration No": app.registration_number,
    "Student Name": app.student_name,
    Gender: app.gender,
    "Date of Birth": new Date(app.dob).toLocaleDateString("en-IN"),
    Class: app.class,
    Religion: app.religion,
    Category: app.category,
    "Blood Group": app.blood_group,
    Father: app.father_name,
    "Father Mobile": app.father_phone,
    Mother: app.mother_name,
    "Mother Mobile": app.mother_phone,
    Email: app.email,
    Address: app.address,
    City: app.city,
    State: app.state,
    Pincode: app.pincode,
    Status: app.status,
    "Submitted On": new Date(app.submitted_at).toLocaleString("en-IN"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Admissions");

  const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");

  XLSX.writeFile(workbook, `BBPS_Admissions_${today}.xlsx`);
}