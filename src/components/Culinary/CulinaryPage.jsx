import React, { useState } from "react";
import Img1 from "../../assets/places/rujak.jpeg";
import Img2 from "../../assets/places/nasijinggo.jpeg";
import Img3 from "../../assets/places/satekakul.jpg";
import Img4 from "../../assets/places/sambalmatah.jpeg";
import Img5 from "../../assets/places/betutu.jpg";
import Img6 from "../../assets/places/jukuturap.jpeg";
import CulinaryCard from "./CulinaryCard";
import { useLocation } from "react-router-dom";

const BlogsData = [
  {
    id: 1,
    image: Img1,
    title: "Rujak Bulung",
    description:
      "Jika biasanya rujak terdiri dari bermacam-macam buah-buahan segar seperti mangga, nanas, atau kedondong yang dipadu dengan sambal pedas manis, lain halnya dengan rujak bulung. Kuliner khas Bali ini menggunakan bahan utama berupa rumput laut segar yang disiram dengan kuah pindang yang gurih. Kuah ini memberikan cita rasa yang unik karena berpadu dengan rasa alami rumput laut. Untuk melengkapi kelezatannya, ditambahkan kelapa parut yang gurih dan kedelai goreng yang renyah, menciptakan perpaduan rasa dan tekstur yang khas serta menyegarkan. Rujak bulung menjadi pilihan tepat bagi pencinta kuliner yang ingin merasakan keunikan cita rasa laut dalam bentuk yang sederhana namun menggugah selera",
    author: "Gogo",
    date: "April 22, 2022",
  },
  {
    id: 2,
    image: Img2,
    title: "Nasi Jinggo",
    description:
      "Salah satu kuliner Pulau Dewata yang sudah cukup terkenal adalah nasi jinggo. Kuliner ini cukup mirip dengan nasi kucing karena dibungkus daun pisang dengan porsi yang kecil namun padat dan berisi. Nasi jinggo biasanya akan disajikan dengan potongan daging yang empuk, mie kuning, sambal goreng tempe yang pedas, dan sambal yang kental dan berempah. Sate lilit yang manis dan beraroma rempah juga kerap kali dijadikan makanan pelengkap untuk menambah kelezatan dan kekayaan cita rasa nasi jinggo tersebut. Nasi jinggo menjadi sajian khas Bali yang wajib dicoba oleh para wisatawan saat berkunjung ke Pulau Dewata, memberikan pengalaman kuliner yang otentik dan tak terlupakan.",
    author: "Gogo",
    date: "April 22, 2022",
  },
  {
    id: 3,
    image: Img3,
    title: "Sate Kakul",
    description:
      "Sate kaku merupakan kuliner tradisional Bali yang berasal dari daerah Ubud. Sate kaku menggunakan bahan utama berupa siput dan memiliki cita rasa yang khas, tidak kalah dengan daging ayam ataupun sapi. Sate kaku adalah sajian kuliner khas Bali yang memiliki keunikan tersendiri. Bahan utamanya adalah siput yang diolah dengan bumbu-bumbu rempah tradisional Bali, sehingga menghasilkan cita rasa yang kuat, kaya, dan sangat lezat. Meskipun berbahan dasar siput, sate kaku tetap menjadi salah satu kuliner favorit bagi masyarakat lokal maupun wisatawan yang berkunjung ke Ubud, Bali. Keberadaannya menjadi salah satu daya tarik kuliner tradisional yang wajib dicoba saat mengunjungi Pulau Dewata.",
    author: "Gogo",
    date: "April 22, 2022",
  },
  {
    id: 4,
    image: Img4,
    title: "Sambal Matah",
    description:
      "Sambal matah sudah sangat populer di kalangan masyarakat dan wisatawan. Sambal yang satu ini sangat cocok untuk mendampingi dan memperkaya berbagai macam hidangan. Cita rasa pedas serta bumbu-bumbu khas yang terkandung dalam sambal matah dijamin akan membuat selera makan Anda semakin meningkat dan terasah. Sambal matah mampu memberikan sentuhan istimewa pada masakan, membuat setiap suapan terasa lebih nikmat dan berkesan. Tidak heran jika sambal matah menjadi pelengkap wajib bagi pecinta kuliner di Indonesia maupun mancanegara. Kehadiran sambal matah seolah melengkapi hidangan, membuat semuanya menjadi lebih sempurna dan menggugah selera.",
    author: "Gogo",
    date: "April 22, 2022",
  },
  {
    id: 5,
    image: Img5,
    title: "Betutu",
    description:
      "Bebek betutu merupakan salah satu hidangan khas Bali yang sangat populer dan menjadi makanan wajib bagi para pecinta kuliner yang berkunjung ke Pulau Dewata. Hidangan ini dibuat dengan menggunakan bahan utama bebek yang dimasak secara tradisional dengan bumbu rempah-rempah betutu yang kaya akan cita rasa. Proses pemasakan bebek betutu yang memakan waktu lama serta penggunaan bumbu rahasia khas Bali membuat daging bebek menjadi sangat empuk, gurih, dan lezat. Setiap suapan bebek betutu akan memanjakan lidah, memberikan sensasi rasa yang kompleks dan unik. Tidak heran jika bebek betutu menjadi salah satu hidangan yang wajib dicoba oleh semua orang yang datang ke Bali. Kepopuleran bebek betutu bahkan telah menembus batas-batas Pulau Dewata, menjadikannya sebagai salah satu ikon kuliner khas Bali yang tersohor di berbagai belahan dunia.",
    author: "Gogo",
    date: "April 22, 2022",
  },
  {
    id: 6,
    image: Img6,
    title: "Jukut Urap",
    description:
      "Jukut urap sering merupakan salah satu hidangan sayuran khas Bali yang sering ditemukan dalam sajian nasi campur atau nasi rames. Jukut urap sering terdiri dari berbagai macam sayuran segar seperti kacang panjang, kangkung, dan jenis sayuran hijau lainnya yang disiram dengan bumbu urap khas Bali. Bumbu urap tersebut dibuat dari campuran kelapa parut, cabai, terasi, gula, dan bumbu rempah lainnya yang memberikan citarasa yang kaya, pedas, dan gurih. Proses pembuatan jukut urap ering cukup sederhana namun menghasilkan sajian yang lezat dan segar. Tekstur sayuran yang masih renyah berpadu dengan creamy bumbu urap membuat setiap suapan jukut urap terasa begitu nikmat. Tidak heran jika jukut urap sering menjadi salah satu lauk wajib yang menyertai nasi campur, memberikan sensasi rasa yang unik dan kaya akan cita rasa Bali. Kehadiran jukut urap ering menyempurnakan kelengkapan hidangan nasi Bali, menjadikannya lebih spesial dan mengundang selera.",
    author: "Gogo",
    date: "April 22, 2022",
  },
];

const CulinaryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  const filteredBlogs = BlogsData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dark:bg-gray-900 dark:text-white py-10">
      <section data-aos="fade-up" className="container space-y-6">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Kuliner Khas Bali
        </h1>

        {location.pathname === "/culinary" && (
          <input
            type="text"
            className="p-2 w-full max-w-[100%] rounded-lg border-2 border-primary focus:outline-none mb-8"
            placeholder="Cari kuliner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBlogs.map((item) => (
            <CulinaryCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CulinaryPage;
