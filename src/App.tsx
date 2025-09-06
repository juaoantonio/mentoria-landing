import {motion} from "motion/react";
import {
    Binary,
    BookOpen,
    CheckCircle2,
    Compass,
    GitBranch,
    LaptopMinimal,
    MessageSquareMore,
    Rocket,
    ShieldCheck,
    Users,
    Wrench,
} from "lucide-react";
import {ContactForm} from "./components/contact-form";


export default function App() {
    return (
        <div className="min-h-screen text-buff">
            <Hero/>
            <IntroMentor/>
            <Benefits/>
            <Who/>
            <HowItWorks/>
            <ContactForm/>
            <Footer/>
        </div>
    );
}

export function Container({children, className = ""}: { children: React.ReactNode; className?: string }) {
    return <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>;
}

export function Section({id, children, className = ""}: {
    id?: string;
    children: React.ReactNode;
    className?: string
}) {
    return (
        <motion.section
            id={id}
            className={`py-8 md:py-20 ${className}`}
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.35}}
            transition={{type: "spring", stiffness: 120, damping: 18}}
        >
            {children}
        </motion.section>
    );
}

function Button({
                    children,
                    href,
                    onClick,
                    variant = "primary",
                    className = "",
                }: {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "ghost";
    className?: string;
}) {
    const styles =
        variant === "primary"
            ? "inline-flex items-center gap-2 rounded-2xl bg-buff px-5 py-3 font-medium text-night transition hover:opacity-95 active:translate-y-px"
            : "inline-flex items-center gap-2 rounded-2xl border border-buff/40 px-5 py-3 font-medium text-buff hover:bg-bistre/40";
    if (href) {
        return (
            <a href={href} className={`${styles} ${className}`}>
                {children}
            </a>
        );
    }
    return (
        <button onClick={onClick} className={`${styles} ${className}`}>
            {children}
        </button>
    );
}

function Hero() {
    return (
        <header className="relative isolate overflow-hidden gradient-hero">
            <Container>
                <nav className="flex items-center justify-between py-5">
                    <a className="text-buff/90 font-semibold tracking-tight" href="#">
                        João Antônio — Mentoria
                    </a>
                    <div className="hidden sm:flex items-center gap-4">
                        <a href="#beneficios" className="text-buff/70 hover:text-buff">Benefícios</a>
                        <a href="#como-funciona" className="text-buff/70 hover:text-buff">Como funciona</a>
                        <a href="#contato" className="text-buff/70 hover:text-buff">Contato</a>
                    </div>
                </nav>
            </Container>
            <Container>
                <div className="grid items-center gap-10 pb-16 pt-10 md:grid-cols-2 md:pb-24 md:pt-16">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{type: "spring", stiffness: 110, damping: 16}}
                    >
                        <p className="text-beaver font-medium">Para quem já viu o básico, mas trava em começar</p>
                        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                            Do básico à prática: mentoria para destravar sua programação
                        </h1>
                        <p className="mt-4 text-buff/80 leading-relaxed">
                            Se você já viu variáveis, condicionais e laços — mas não sabe transformar
                            isso em um
                            <span className="font-semibold text-buff"> projeto real</span>, eu te guio passo a passo até
                            a autonomia.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button href="#contato">
                                <MessageSquareMore className="size-5"/>
                                Quero destravar meus estudos
                            </Button>
                            <Button href="#beneficios" variant="ghost">
                                <ShieldCheck className="size-5"/>
                                Ver benefícios
                            </Button>
                        </div>
                        <ul className="mt-6 grid max-w-lg grid-cols-1 gap-3 text-buff/70 sm:grid-cols-2">
                            {[
                                "Plano de estudos guiado",
                                "Projetos práticos e feedback",
                                "Ferramentas sem sofrimento (Git, IDE, terminal)",
                                "Método para aprender sem se perder",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                    <CheckCircle2 className="size-5 text-beaver min-w-max min-h-max"/>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, scale: 0.96}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{type: "spring", stiffness: 120, damping: 16, delay: 0.1}}
                        className="relative mx-auto w-full max-w-md"
                    >
                        <div className="glass rounded-2xl p-2 shadow-[var(--shadow-soft)]">
                            <img
                                src="/me.jpg"
                                loading={'lazy'}
                                decoding={'async'}
                                alt="Foto do mentor, João Antônio"
                                className="w-full rounded-xl object-cover"
                            />
                        </div>
                        <div
                            className="pointer-events-none absolute -right-6 -top-6 hidden rotate-6 rounded-2xl border border-buff/30 p-3 text-buff/70 md:block">
                <span className="flex items-center gap-2 text-sm">
                  <Rocket className="size-4 text-beaver"/> Bora construir de verdade
                </span>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </header>
    );
}

function IntroMentor() {
    return (
        <Section>
            <Container>
                <div className="grid items-center gap-10 md:grid-cols-[1.1fr_.9fr]">
                    <motion.div className="order-2 md:order-1">
                        <h2 className="text-2xl font-bold">Quem vai te guiar</h2>
                        <p className="mt-3 text-buff/80">
                            Sou João Antônio, dev web em Belém (PA). Já passei pelo caminho do iniciante inseguro ao
                            profissional — e transformei isso num método prático, direto ao ponto e sem enrolação.
                        </p>
                        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {[
                                {icon: BookOpen, label: "Base forte, passo a passo"},
                                {icon: Wrench, label: "Prática guiada com feedback"},
                                {icon: GitBranch, label: "Git/GitHub sem dor de cabeça"},
                                {icon: LaptopMinimal, label: "Ambiente (IDE/terminal) redondo"},
                            ].map(({icon: Icon, label}) => (
                                <li key={label} className="flex items-center gap-2">
                                    <Icon className="size-5 text-beaver"/>
                                    <span className="text-buff/80">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div className="order-1 md:order-2" initial={{opacity: 0, x: 20}}
                                whileInView={{opacity: 1, x: 0}}>
                        <div className="rounded-2xl border border-buff/20 bg-night p-6">
                            <p className="text-sm uppercase tracking-wider text-buff/60">Sobre a mentoria</p>
                            <h3 className="mt-2 text-xl font-semibold">Para quem já tocou no código e quer
                                confiança</h3>
                            <p className="mt-3 text-buff/80">
                                A proposta é simples: sair do “exercício de sala” e construir algo útil. Você aprende a
                                aprender,
                                organiza seu estudo e ganha autonomia — sem se perder em mil tutoriais.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}

function Benefits() {
    const items = [
        {icon: Compass, title: "Plano claro", desc: "Roteiro de estudo sob medida para o seu momento."},
        {icon: Binary, title: "Do conceito ao projeto", desc: "Prática progressiva com desafios reais."},
        {icon: Wrench, title: "Ferramentas na veia", desc: "IDE, Git, terminal — sem travar no setup."},
        {icon: Users, title: "Apoio e comunidade", desc: "Você não estuda sozinho, compartilha progresso."},
        {icon: ShieldCheck, title: "Confiança", desc: "Feedback direto para consolidar o que aprendeu."},
        {icon: Rocket, title: "Autonomia", desc: "Método para seguir evoluindo depois da mentoria."},
    ];
    return (
        <Section id="beneficios" className="bg-night/60">
            <Container>
                <h2 className="text-center text-2xl font-bold">Benefícios da mentoria</h2>
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map(({icon: Icon, title, desc}) => (
                        <motion.div
                            key={title}
                            className="rounded-2xl border border-buff/15 bg-night-2 p-5 shadow-[var(--shadow-soft)]"
                            whileHover={{y: -3}}
                            transition={{type: "spring", stiffness: 250, damping: 18}}
                        >
                            <div className="flex items-start gap-3">
                                <Icon className="size-6 shrink-0 text-beaver"/>
                                <div>
                                    <h3 className="font-semibold">{title}</h3>
                                    <p className="mt-1 text-sm text-buff/75">{desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

function Who() {
    const bullets = [
        "Você que já viu variáveis, if/else e laços — mas ainda não se sente seguro.",
        "Estudantes do início da graduação que travam para começar projetos.",
        "Quem quer aprender ferramentas (Git, IDE, terminal) sem sofrimento.",
        "Quem busca um método para estudar sem se perder em tutoriais.",
    ];
    return (
        <Section>
            <Container>
                <div className="grid items-start gap-10 md:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-bold">Quem pode participar?</h2>
                        <p className="mt-3 text-buff/80">
                            Feita para iniciantes com alguma base escolar — como o Renato — que querem transformar o
                            básico em prática.
                        </p>
                        <ul className="mt-6 space-y-3">
                            {bullets.map((b) => (
                                <li key={b} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 size-5 text-beaver"/>
                                    <span className="text-buff/80">{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-2xl border border-buff/15 bg-night p-6">
                        <h3 className="font-semibold">Resultados que você leva</h3>
                        <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {[
                                "Projeto do zero (do briefing ao deploy)",
                                "Git e GitHub no fluxo certo",
                                "Ambiente de dev configurado",
                                "Plano de estudo contínuo",
                            ].map((r) => (
                                <li key={r} className="flex items-center gap-2 text-buff/80">
                                    <CheckCircle2 className="size-5 text-beaver"/>
                                    {r}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Container>
        </Section>
    );
}

function HowItWorks() {
    const steps = [
        {icon: Compass, title: "Diagnóstico inicial", desc: "Mapeamos seu momento, metas e lacunas."},
        {icon: BookOpen, title: "Trilha sob medida", desc: "Plano de estudo com checkpoints semanais."},
        {icon: Wrench, title: "Mão na massa", desc: "Aulas práticas, projetos e feedback contínuo."},
        {icon: Rocket, title: "Autonomia", desc: "Método para seguir evoluindo sem se perder."},
    ];
    return (
        <Section id="como-funciona" className="bg-[linear-gradient(180deg,var(--color-night-2),var(--color-night))]">
            <Container>
                <h2 className="text-center text-2xl font-bold">Como funciona?</h2>
                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {steps.map(({icon: Icon, title, desc}, i) => (
                        <motion.div
                            key={title}
                            className="rounded-2xl border border-buff/15 bg-night p-6"
                            initial={{opacity: 0, y: 12}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: i * 0.05}}
                        >
                            <div className="flex items-start gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-bistre/60">
                                    <Icon className="size-5 text-beaver"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{title}</h3>
                                    <p className="mt-1 text-buff/75">{desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

function Footer() {
    return (
        <footer className="border-t border-buff/10 bg-night/60">
            <Container className="py-8 text-center text-sm text-buff/70">
                João Antônio. Todos os direitos reservados © 2025
            </Container>
        </footer>
    );
}
