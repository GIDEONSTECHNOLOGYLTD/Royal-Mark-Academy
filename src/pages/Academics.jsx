export default function Academics() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-5xl font-extrabold text-blue-900 mb-8 text-center">Academics</h1>
      <div className="bg-blue-50 rounded-xl shadow p-6 mb-8">
        <p className="text-lg text-gray-700 mb-4">Royal Mark Academy offers a rich, holistic curriculum designed to foster intellectual, social, and emotional growth from Nursery through Secondary levels. Our dedicated teachers and modern facilities support students in achieving academic excellence and lifelong success.</p>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Subjects & Curriculum</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Core Subjects</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>English Language & Literature</li>
              <li>Mathematics</li>
              <li>Basic Science & Technology</li>
              <li>Social Studies</li>
              <li>Civic Education</li>
              <li>Religious & Moral Education</li>
              <li>Computer Studies</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Elective Subjects</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Business Studies & Economics</li>
              <li>Creative Arts & Music</li>
              <li>Physical & Health Education</li>
              <li>French & Nigerian Languages</li>
              <li>Vocational Studies</li>
              <li>Sciences: Physics, Chemistry, Biology</li>
              <li>Commercial: Accounting, Commerce</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Facilities</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Academic Facilities</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Modern classrooms and science laboratories</li>
              <li>ICT/computer lab</li>
              <li>Library and resource center</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-2">Recreational Facilities</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Sports field and playground</li>
              <li>Art, music, and creative studios</li>
              <li>Secure, serene learning environment</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">Academic Calendar (Sample)</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <table className="min-w-full bg-white rounded shadow text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-blue-100">Term</th>
                <th className="py-2 px-4 bg-blue-100">Start</th>
                <th className="py-2 px-4 bg-blue-100">End</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">First Term</td>
                <td className="py-2 px-4">September 9, 2024</td>
                <td className="py-2 px-4">December 13, 2024</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Second Term</td>
                <td className="py-2 px-4">January 6, 2025</td>
                <td className="py-2 px-4">April 4, 2025</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Third Term</td>
                <td className="py-2 px-4">April 28, 2025</td>
                <td className="py-2 px-4">July 18, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
