import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import docx from 'docx'
const {
  Document,
  Header,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  AlignmentType
} = docx

const anoAtual = new Date().getFullYear();
const siassQtd = 88;
const servicoMedicoQtd = 88;
const servicoNutricaoQtd = 88;
const servicoEnfermagemQtd = 88;
const servicoOdontoQtd = 88;
const servicoPsicologiaQtd = 88;

export const createDoc = (req, res) => {
    const doc = new Document({
      sections: [
        {
          headers: {
            first: new Header({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "UNIVERSIDADE FEDERAL DE RORAIMA",
                      bold: true,
                      font: "Times New Roman",
                      size: 24,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),

                new Paragraph({
                  children: [
                    new TextRun({
                      text: "PRÓ-REITORIA DE GESTÃO DE PESSOAS",
                      bold: true,
                      font: "Times New Roman",
                      size: 24,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "DIRETORIA DE SAÚDE E ASSISTÊNCIA SOCIAL",
                      bold: true,
                      font: "Times New Roman",
                      size: 24,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),

                new Paragraph({
                  children: [
                    new ImageRun({
                      data: fs.readFileSync(path.resolve(__dirname,"images","logoteste.png")),
                      transformation: {
                        width: 100,
                        height: 100,
                      },
                      floating: {
                        horizontalPosition: {
                          offset: 5659200,
                        },
                        verticalPosition: {
                          offset: 154800,
                        },
                      },
                    }),

                    new ImageRun({
                      data: fs.readFileSync(path.resolve(__dirname,"images","logoteste.png")),
                      transformation: {
                        width: 100,
                        height: 100,
                      },
                      // H 2.59   V 0.43 
                      floating: {
                        horizontalPosition: {
                          offset: 932400,
                        },
                        verticalPosition: {
                          offset: 154800,
                        },
                      },
                    }),
                  ],
                }),
              ],
            }),
          }, // FIM DO headers
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `RELATÓRIO ANUAL ${anoAtual}`,
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 400,
              },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "SIASS",
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.LEFT,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `No ano de ${anoAtual}, o SIASS realizou ${siassQtd} atendimentos em perícias médicas, sendo
                  elas, presencial e documental.`,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "SERVIÇO MÉDICO",
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.LEFT,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `Os atendimentos nas especialidades de pediatria e clínica geral, totalizam ${servicoMedicoQtd}
                          atendimentos. Considerando o período de funcionamento de setembro e outubro de ${anoAtual}`,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "SERVIÇO DE NUTRIÇÃO",
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.LEFT,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `Foram realizados ${servicoNutricaoQtd} atendimentos em nutrição, considerando o período de
                    funcionamento de setembro e outubro de ${anoAtual}.`,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "SERVIÇO DE ENFERMAGEM",
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.LEFT,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `Foram realizadas ${servicoEnfermagemQtd} triagens pela enfermagem, considerando o período de
                    funcionamento de setembro e outubro de ${anoAtual}.`,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "SERVIÇO DE ODONTOLOGIA",
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.LEFT,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `Foram realizados ${servicoOdontoQtd} atendimentos em Odontologia.`,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "SERVIÇO DE PSICOLOGIA",
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.LEFT,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: `O serviço de psicologia é integrado por diversas possibilidades de atuação e
                    atividades. No ano de ${anoAtual} foram realizados ${servicoPsicologiaQtd} atendimentos direto com usuário, além de
                    ações institucionais.`,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.JUSTIFIED,
            }),
          ], // Fim do children principal
          properties: { titlePage: true },
        },
      ],
    });

    Packer.toBuffer(doc).then((buffer) => {
      fs.writeFileSync("./relatorio.docx", buffer);
    });
    res.sendFile('./relatorio.docx',{ root : "./"})
}
