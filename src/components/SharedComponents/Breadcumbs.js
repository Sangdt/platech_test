import { useRouter } from "next/router";
import Link from "next/link";
const Noop = ({ children }) => children

const Breadumbs = ({ useLayout = true,RouteName }) => {
    const router = useRouter();
    const BreadcumbLayout = useLayout ? ({ children }) => <div className="wrap-main">{children}</div> : Noop

    //console.log("path",router.asPath)
    
    return (<BreadcumbLayout>
        <ol className="breadcrumb">
            <Link href="/">
                <li>
                    <a title="Trang chủ">
                        Trang chủ
                    </a>
                </li>
            </Link>

            {/* <li><a title="Giới thiệu">Giới thiệu</a></li> */}
            <Link href={router.asPath}>
                <li className="active">
                    <a>
                        {RouteName}
                    </a>
                </li>
            </Link>

        </ol>
    </BreadcumbLayout>)
}
export default Breadumbs