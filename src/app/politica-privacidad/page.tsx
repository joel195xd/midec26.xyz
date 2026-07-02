import Section from "@/components/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Midec26",
  description:
    "Política de privacidad del sitio midec26.xyz. Información sobre recopilación de datos, cookies y servicios de terceros.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="pt-24 pb-20">
      <Section id="privacidad">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-4">
            Política de Privacidad
          </h1>
          <div className="w-16 h-1 bg-accent rounded-full mb-4" />
          <p className="text-sm text-text-secondary mb-12">
            Última actualización: 1 de julio de 2026
          </p>

          <div className="prose prose-invert max-w-none space-y-10 text-text-secondary leading-relaxed">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                1. Responsable del tratamiento
              </h2>
              <p>
                El responsable del tratamiento de los datos en este sitio web es
                el titular de midec26.xyz. Para consultas relativas a esta política
                de privacidad, puedes contactarnos a través de nuestras redes
                sociales enlazadas en el pie de página.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                2. Información que recopilamos
              </h2>
              <p className="mb-3">
                Este sitio web <strong>no recopila información personal de forma
                directa</strong> (nombre, correo electrónico, dirección, etc.).
              </p>
              <p>
                Sin embargo, al visitar midec26.xyz se pueden recopilar datos de
                forma automática a través de servicios de terceros:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  <strong>Google AdSense</strong> — Puede recopilar información
                  sobre tu navegador, dispositivo, dirección IP, páginas visitadas
                  y anuncios mostrados o clickeados, con el fin de servir anuncios
                  personalizados.
                </li>
                <li>
                  <strong>Google Analytics</strong> (si está activo) — Recopila
                  datos anónimos de tráfico como páginas visitadas, tiempo de
                  permanencia, origen del tráfico y dispositivo utilizado.
                </li>
                <li>
                  <strong>Spotify</strong> — El widget de reproducción integrado
                  puede usar cookies propias para funcionar correctamente.
                </li>
                <li>
                  <strong>YouTube</strong> — Los videos embebidos establecen
                  cookies cuando se reproducen, según la política de Google.
                </li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                3. Cookies y tecnologías de rastreo
              </h2>
              <p className="mb-3">
                Este sitio utiliza cookies a través de los servicios de terceros
                integrados. Las cookies son pequeños archivos que se almacenan en
                tu dispositivo para mejorar la experiencia de navegación y
                permitir ciertas funcionalidades.
              </p>
              <p className="mb-3">
                <strong>Tipos de cookies utilizadas:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Cookies de publicidad (AdSense)</strong> — Se utilizan
                  para mostrar anuncios relevantes. Google y sus socios usan estas
                  cookies para servir anuncios basados en visitas anteriores a
                  este u otros sitios web.
                </li>
                <li>
                  <strong>Cookies de funcionalidad (Spotify, YouTube)</strong> —
                  Necesarias para que los widgets embebidos funcionen correctamente
                  (reproducción de música y video).
                </li>
              </ul>
              <p className="mt-3">
                Puedes gestionar o desactivar las cookies desde la configuración
                de tu navegador. También puedes{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  desactivar la personalización de anuncios de Google
                </a>{" "}
                o{" "}
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  optar por no recibir anuncios personalizados de socios de
                  publicidad
                </a>.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                4. Uso de la información
              </h2>
              <p>
                La información recopilada a través de Google AdSense se utiliza
                exclusivamente para:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>
                  Mostrar anuncios personalizados según tus intereses de
                  navegación.
                </li>
                <li>
                  Limitar la cantidad de veces que ves un mismo anuncio.
                </li>
                <li>
                  Medir la eficacia y el rendimiento de los anuncios mostrados.
                </li>
                <li>
                  Prevenir el fraude publicitario y garantizar la seguridad de
                  las campañas.
                </li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                5. Servicios de terceros
              </h2>
              <p className="mb-3">
                Este sitio integra los siguientes servicios de terceros, cada uno
                con su propia política de privacidad:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Google AdSense</strong> —{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Política de Privacidad de Google
                  </a>
                </li>
                <li>
                  <strong>Spotify</strong> —{" "}
                  <a
                    href="https://www.spotify.com/legal/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Política de Privacidad de Spotify
                  </a>
                </li>
                <li>
                  <strong>YouTube (Google)</strong> —{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Política de Privacidad de Google
                  </a>
                </li>
              </ul>
              <p className="mt-3">
                No nos hacemos responsables de las prácticas de privacidad de
                estos servicios de terceros. Te recomendamos revisar sus políticas
                directamente en sus sitios oficiales.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                6. Consentimiento del usuario
              </h2>
              <p>
                Al navegar por midec26.xyz, aceptas el uso de cookies y la
                recopilación de datos descrita en esta política. Si no estás de
                acuerdo con el uso de cookies, puedes desactivarlas desde la
                configuración de tu navegador o utilizar las herramientas de opt-out
                de Google.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                7. Derechos del usuario (RGPD)
              </h2>
              <p className="mb-3">
                Si resides en el Espacio Económico Europeo (EEE), tienes los
                siguientes derechos respecto a tus datos personales:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Derecho de acceso</strong> — Solicitar una copia de los
                  datos personales que tenemos sobre ti.
                </li>
                <li>
                  <strong>Derecho de rectificación</strong> — Solicitar la
                  corrección de datos inexactos.
                </li>
                <li>
                  <strong>Derecho de supresión</strong> — Solicitar la eliminación
                  de tus datos personales.
                </li>
                <li>
                  <strong>Derecho de oposición</strong> — Oponerte al
                  procesamiento de tus datos.
                </li>
                <li>
                  <strong>Derecho a la portabilidad</strong> — Solicitar la
                  transferencia de tus datos a otro responsable.
                </li>
                <li>
                  <strong>Derecho a retirar el consentimiento</strong> — Retirar
                  en cualquier momento el consentimiento otorgado.
                </li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, contáctanos a través
                de nuestras redes sociales. Si consideras que tus derechos no
                están siendo respetados, puedes presentar una reclamación ante la
                autoridad de control competente.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                8. Menores de edad
              </h2>
              <p>
                Este sitio web no está dirigido a menores de 16 años. No
                recopilamos conscientemente información personal de menores. Si
                eres padre o tutor y crees que tu hijo ha proporcionado información
                personal a través de este sitio, contáctanos para que procedamos a
                su eliminación.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                9. Seguridad de los datos
              </h2>
              <p>
                Implementamos medidas de seguridad razonables para proteger la
                información recopilada a través de este sitio. Sin embargo, ningún
                método de transmisión por Internet o de almacenamiento electrónico
                es 100% seguro, por lo que no podemos garantizar la seguridad
                absoluta de los datos.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                10. Cambios en esta política
              </h2>
              <p>
                Nos reservamos el derecho de actualizar esta política de
                privacidad en cualquier momento. Los cambios serán publicados en
                esta página con la fecha de la última actualización. Te
                recomendamos revisar esta política periódicamente.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                11. Contacto
              </h2>
              <p>
                Si tienes preguntas sobre esta política de privacidad o sobre el
                tratamiento de tus datos, puedes contactarnos a través de nuestras
                redes sociales:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Instagram: @rial_markho</li>
                <li>TikTok: @markh0__</li>
                <li>YouTube: @MarkhoES</li>
                <li>X (Twitter): @midec26</li>
              </ul>
            </section>
          </div>
        </div>
      </Section>
    </main>
  );
}
