import React from "react";
import { Typography, Row, Col, Card, Divider, Image } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import Location from "../components/Location/Location"; 

const { Title, Paragraph } = Typography;

const About = () => {
  const corbelStyle = {
    fontFamily: "'Corbel', serif",
  };

  const teamMembers = [
    {
      name: "ANGGA PRATAMA",
      role: "IT DEVELOPER",
      image: "./src/assets/team/angga.jpg",
    },
    {
      name: "NGURAH EKA PRAYOGA",
      role: "IT DEVELOPER",
      image: "./src/assets/team/prayoga.png",
    },
    {
      name: "ENILIA UTARI",
      role: "VISUAL ART",
      image: "./src/assets/team/lia.jpg",
    },
    {
      name: "BHATHIYA DHARMAWAN",
      role: "VISUAL ART",
      image: "./src/assets/team/batok.jpg",
    },
  ];

  return (
    <>
      <style jsx>{`
        .about-section {
          text-align: left;
        }

        .about-divider {
          font-weight: bold;
          text-transform: uppercase;
        }

        .about-paragraph {
          font-size: 16px;
          line-height: 1.5;
          max-width: 600px;
          margin-top: 1rem;
        }

        .team-card {
          border-radius: 8px;
        }

        .team-image {
          border-radius: 8px;
          width: 100%;
          height: auto;
        }
      `}</style>

      <div className="container pt-12" style={{ paddingTop: "4rem" }}>
        {/* Who We Are Section */}
        <Row justify="center" align="middle" style={{ marginBottom: "3rem" }}>
          <Col span={8}>
            <Image
              src="./images/A.png"
              alt="Logo"
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "auto",
                marginBottom: "2rem",
              }}
              preview={false}
            />
          </Col>
          <Col span={16} className="about-section">
            <Divider orientation="left" className="about-divider">
              <Title
                level={2}
                style={{
                  font: "corbelStyle",
                  fontSize: "28px",
                  color: "#1e3a8a",
                }}
              >
                Siapa Kami?
              </Title>
            </Divider>
            <Paragraph
              style={{
                font: "corbelStyle",
                fontWeight: "normal",
                fontSize: "20px",
                marginTop: "1rem",
                maxWidth: "600px",
                color: "#333",
              }}
            >
              "Menyempurnakan Jejak Anda di Tanah Dewata, Biarkan Cerita
              Dimulai!"
            </Paragraph>
            <Paragraph
              className="about-paragraph"
              style={{ font: "corbelStyle", color: "#555" }}
            >
              Dewata Trails lahir dari visi untuk membawa dunia ke dalam
              keindahan Bali yang tak terungkap. Hadir untuk menyempurnakan
              setiap langkah wisatawan yang menginjakkan kaki di Pulau Dewata.
              Kami adalah penghubung antara imajinasi dan kenyataan,
              menghidupkan setiap pengalaman perjalanan dengan panduan yang
              autentik dan mendalam, yang akan membawa Anda lebih dekat dengan
              esensi Bali sesungguhnya.
            </Paragraph>
          </Col>
        </Row>

        {/* Vision and Mission Section */}
        <Row justify="start" style={{ marginTop: "2rem" }} align="middle">
          <Col span={16}>
            <Divider orientation="left" style={{ textTransform: "uppercase" }}>
              <Title
                level={2}
                style={{ font: "corbelStyle", color: "#1e3a8a" }}
              >
                Visi Kami
              </Title>
            </Divider>
            <Card bordered={false} style={{ backgroundColor: "#f0f2f5" }}>
              <Paragraph
                style={{
                  fontFamily: "'Corbel', serif",
                  fontSize: "17px",
                  color: "#555",
                }}
              >
                "Menjadi gerbang utama yang memperkenalkan pesona dan kekayaan
                Pulau Dewata melalui panduan wisata yang autentik, inspiratif,
                dan mendalam, sehingga setiap pengalaman berwisata menjadi
                sebuah cerita yang bermakna dan tak terlupakan."
              </Paragraph>
            </Card>

            <Divider
              orientation="left"
              style={{ marginTop: "2rem", textTransform: "uppercase" }}
            >
              <Title
                level={2}
                style={{ font: "corbelStyle", color: "#1e3a8a" }}
              >
                Misi Kami
              </Title>
            </Divider>
            <Card bordered={false} style={{ backgroundColor: "#f0f2f5" }}>
              <Paragraph
                style={{
                  fontFamily: "'Corbel', serif",
                  fontSize: "16px",
                  color: "#555",
                }}
              >
                <ol>
                  <li style={{ marginBottom: "1rem" }}>
                    Menyediakan pengalaman yang mudah diakses, inspiratif, dan
                    personal untuk setiap wisatawan, membuat perjalanan mereka
                    ke Bali lebih bermakna.
                  </li>
                  <li style={{ marginBottom: "1rem" }}>
                    Meningkatkan kompetensi tim internal dan kemitraan strategis
                    untuk memperkuat daya saing dan keberlanjutan platform.
                  </li>
                  <li>
                    Mengutamakan kualitas dan keberagaman informasi untuk
                    memastikan bahwa setiap pengunjung website dapat menemukan
                    destinasi yang sesuai dengan keinginan mereka di Bali.
                  </li>
                </ol>
              </Paragraph>
            </Card>
          </Col>
        </Row>

        {/* Tim Kami Section */}
        <Row justify="center" style={{ marginTop: "3rem" }}>
          <Col span={24}>
            <Divider orientation="center">
              <Title
                level={2}
                style={{ font: "corbelStyle", color: "#1e3a8a" }}
              >
                TIM KAMI
              </Title>
            </Divider>
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          {teamMembers.map((member, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <Card
                className="team-card"
                cover={
                  <Image
                    alt={member.name}
                    src={member.image}
                    className="team-image"
                    preview={false} // Menghapus fitur preview (klik untuk zoom)
                  />
                }
              >
                <Card.Meta title={member.name} description={member.role} />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Location Section */}
        <Row justify="center" className="py-10">
          <Col span={20}>
            <Location />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default About;