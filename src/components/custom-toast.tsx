import React from "react";
import { toast as sonnerToast } from "sonner";
import {CheckCircle2, AlertTriangle, Info, X, Loader} from "lucide-react";

/** Variantes alinhadas à paleta da landing. */
type AppToastVariant = "success" | "error" | "info" | 'loading';

export interface AppToastProps {
    id: string | number;
    title: string;
    description?: string;
    variant?: AppToastVariant;
    action?: {
        label: string;
        onClick: () => void;
    };
}

/** API simples para disparar o toast customizado.
 *  Ex.: showToast({ title: "Enviado!", variant: "success" })
 */
export function showToast(
    toast: Omit<AppToastProps, "id"> & { duration?: number }
) {
    const { duration = 4000, ...rest } = toast;
    return sonnerToast.custom((id) => <AppToast id={id} {...rest} />, {
        duration,
    });
}

/** Componente visual — headless + estilizado na paleta */
export function AppToast(props: AppToastProps) {
    const { id, title, description, variant = "info", action } = props;

    const styles = {
        success: {
            icon: <CheckCircle2 className="size-5 text-green-500" aria-hidden="true" />,
            ring: "ring-green-500/30",
            leftAccent: "bg-green-500",
        },
        error: {
            icon: <AlertTriangle className="size-5 text-rose-600" aria-hidden="true" />,
            ring: "ring-rose-600/30",
            leftAccent: "bg-rose-600",
        },
        info: {
            icon: <Info className="size-5 text-buff" aria-hidden="true" />,
            ring: "ring-buff/30",
            leftAccent: "bg-buff",
        },
        loading: {
            icon: <Loader className="size-5 animate-spin text-buff" aria-hidden="true" />,
            ring: "ring-buff/30",
            leftAccent: "bg-buff",
        },
    }[variant];

    const live = variant === "error" ? "assertive" : "polite";

    return (
        <div
            role={variant === "error" ? "alert" : "status"}
            aria-live={live}
            className={[
                "group/toast relative flex w-full items-start gap-3 overflow-hidden",
                "rounded-2xl border border-buff/15 bg-night-2/95 p-4",
                "shadow-[var(--shadow-soft)] backdrop-blur supports-[backdrop-filter]:backdrop-blur",
                "ring-1", styles.ring,
                "md:max-w-[380px]",
            ].join(" ")}
        >
            {/* Acento à esquerda na cor da variante */}
            <span
                aria-hidden
                className={["absolute left-0 top-0 h-full w-1.5 rounded-l-2xl", styles.leftAccent].join(" ")}
            />

            {/* Ícone */}
            <div className="mt-0.5 flex shrink-0 min-w-min min-h-min items-center justify-center">
                {styles.icon}
            </div>

            {/* Conteúdo */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-buff">{title}</p>
                {description ? (
                    <p className="mt-1 line-clamp-3 text-sm text-buff/75">{description}</p>
                ) : null}

                {/* Ação opcional */}
                {action ? (
                    <div className="mt-3">
                        <button
                            onClick={() => {
                                try {
                                    action.onClick();
                                } finally {
                                    sonnerToast.dismiss(id);
                                }
                            }}
                            className={[
                                "inline-flex items-center gap-2 rounded-xl",
                                "border border-buff/25 bg-night px-3 py-1.5 text-sm font-medium",
                                "text-buff hover:bg-bistre/40 focus:outline-none",
                                "focus-visible:ring-2 focus-visible:ring-offset-0",
                                "focus-visible:ring-buff/50",
                            ].join(" ")}
                        >
                            {action.label}
                        </button>
                    </div>
                ) : null}
            </div>

            {/* Botão fechar */}
            <button
                aria-label="Fechar"
                onClick={() => sonnerToast.dismiss(id)}
                className={[
                    "rounded-md p-1 transition",
                    "text-buff/60 hover:text-buff",
                    "hover:bg-bistre/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-buff/50",
                ].join(" ")}
            >
                <X className="size-4" />
            </button>
        </div>
    );
}
