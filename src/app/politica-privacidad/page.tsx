import Section from "@/components/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad — Midec26",
  description: "Política de privacidad del sitio midec26.xyz",
};

export default function PoliticaPrivacidadPage() {
  return (
    <main className="pt-24 pb-20">
      <Section id="privacidad">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-foreground mb-4">
            Política de Privacidad
          </h1>
          <div className="w-16 h-1 bg-accent rounded-full mb-12" />

          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary">
            <section>
              <h2 className="text-2xl font-bold text-foreground">1. Información que recopilamos</h2>
              <p>
                Este sitio web no recopila información personal de forma directa.
                Los servicios de terceros integrados (Google AdSense, Spotify, YouTube)
                pueden recopilar datos de navegación según sus propias políticas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">2. Cookies y tecnologías de rastreo</h2>
              <p>
                Utilizamos Google AdSense, que utiliza cookies para personalizar anuncios.
                Puedes gestionar tus preferencias de cookies a través de la configuración
                de tu navegador o visitar{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Configuración de anuncios de Google
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">3. Servicios de terceros</h2>
              <p>Este sitio integra los siguientes servicios de terceros:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Google AdSense</strong> — Publicidad basada en intereses</li>
                <li><strong>Spotify</strong> — Widget de reproducción musical</li>
                <li><strong>YouTube</strong> — Embeds de video</li>
              </ul>
              <p className="mt-2">
                Cada servicio tiene su propia política de privacidad. Te recomendamos
                revisarlas directamente en sus sitios oficiales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">4. Derechos del usuario</h2>
              <p>
                Tienes derecho a acceder, rectificar o eliminar tus datos personales.
                Para ejercer estos derechos, contáctanos a través de nuestras redes sociales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground">5. Cambios en esta política</h2>
              <p>
                Nos reservamos el derecho de actualizar esta política de privacidad
                en cualquier momento. Los cambios serán publicados en esta página.
              </p>
            </section>
          </div>
        </div>
      </Section>
    </main>
  );
}
