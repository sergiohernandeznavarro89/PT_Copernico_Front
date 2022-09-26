import { Spacer, Text, useTheme, Link as NextUiLink } from "@nextui-org/react"
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {

    const { theme } = useTheme();

    return (
        <div style={{
            display: "flex",
            width: '100%',
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0px 20px',
            backgroundColor: theme?.colors.gray100.value
        }}>

            <Link href="/" passHref>
                <NextUiLink>
                    <Image
                        src={"https://copernicusservicing.com/wp-content/uploads/2019/10/logo-blanco.svg"}
                        alt="icono de la app"
                        width={80}
                        height={80}
                    />
                </NextUiLink>
            </Link>

            <Spacer css={{ flex: 1 }} />
        </div>
    )
}
