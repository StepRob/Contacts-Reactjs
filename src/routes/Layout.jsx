import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from "react-router-dom"
import { useEffect } from "react";
import { getContacts, createContact } from "../contacts";

export async function createContacto() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loaderData({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

export const Layout = () => {
    const { contacts, q } = useLoaderData();

    const navigation = useNavigation();
    const submit = useSubmit();

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <>
            <div id="sidebar" className="bg-slate-50 fixed inset-y-0 p-4 w-72 h-screen">

                <div className="border-b pb-5 flex flex-row items-center gap-3 p-2">
                    <Form id="search-form" role="search">

                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Buscar"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        />

                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>

                    <Form method="post">
                        <button type="submit" className="bg-blue-500 text-white rounded-md mt-1 px-3 py-2">Nuevo</button>
                    </Form>
                </div>

                <nav>
                    {contacts.length ? (
                        <ul className="flex flex-col gap-3 px-3 py-2">
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No hay nombre</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i >No hay contactos</i>
                        </p>
                    )}
                </nav>

                <div className="bg-blue-100 font-bold mb-5 text-start px-3 py-2 absolute w-full bottom-0 left-0">
                    <h1>Contactos</h1>

                </div>

            </div>

            <div id="detail"
                className={`${navigation.state === "loading" ? "loading" : ""} ml-72 h-screen`}>
                <Outlet />
            </div>
        </>
    )
}
