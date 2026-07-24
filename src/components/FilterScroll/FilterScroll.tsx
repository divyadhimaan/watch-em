import React, { useRef, useState, useEffect } from 'react'
import {
    Button,
    IconButton,
    Flex,
    Tag,
} from "@once-ui/components";

import { TAGS } from "@/resources/tags";
import styles from "./FilterScroll.module.scss";

import Link from "next/link";


export const FilterScroll = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const checkScroll = () => {
        const el = scrollRef.current;
        if (el) {
            setShowLeft(el.scrollLeft > 0);
            setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
        }
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const checkScrollRef = useRef<(() => void) | null>(null);
    checkScrollRef.current = checkScroll;

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const handler = () => {
            checkScrollRef.current?.();
        };

        el.addEventListener("scroll", handler);
        window.addEventListener("resize", handler);

        return () => {
            el.removeEventListener("scroll", handler);
            window.removeEventListener("resize", handler);
        };
    }, []);

    const filterLinks = TAGS.filter(item => item.link);

    return (
        <>
            {TAGS.length > 0 && (
                <>
                    {/* Desktop: horizontal scroll */}
                    <div className={`${styles.wrapper} s-flex-hide`}>
                        {showLeft && (
                            <Flex paddingTop="20" paddingBottom="8" gap="8" horizontal="start" fitWidth>
                                <IconButton
                                    icon="arrowLeft2"
                                    size="l"
                                    onClick={scrollLeft}
                                    className={styles.scrollButton}
                                />
                            </Flex>
                        )}
                        <div ref={scrollRef} className={styles.scrollContainer}>
                            <Flex paddingTop="20" paddingBottom="8" gap="8" horizontal="start" fitWidth>
                                {filterLinks.map((item) => (
                                    <Link key={item.label} href={`/filter?tag=${item.value || slugify(item.label)}`}>
                                        <Button
                                            prefixIcon={item.icon}
                                            label={item.label}
                                            size="m"
                                            variant="secondary"
                                        />
                                    </Link>
                                ))}
                            </Flex>
                        </div>
                        {showRight && (
                            <Flex paddingTop="20" paddingBottom="8" gap="8" horizontal="start" fitWidth>
                                <IconButton
                                    icon="arrowRight2"
                                    size="l"
                                    onClick={scrollRight}
                                    className={styles.scrollButton}
                                />
                            </Flex>
                        )}
                    </div>

                    {/* Mobile: collapsible filter picker */}
                    <div className={`${styles.mobileFilter} s-flex-show`}>
                        <Button
                            prefixIcon="filter"
                            suffixIcon={mobileOpen ? "chevronUp" : "chevronDown"}
                            label="Browse by genre"
                            variant="secondary"
                            size="m"
                            onClick={() => setMobileOpen(prev => !prev)}
                        />
                        {mobileOpen && (
                            <div className={styles.mobileGrid}>
                                {filterLinks.map((item) => (
                                    <Link key={item.label} href={`/filter?tag=${item.value || slugify(item.label)}`} onClick={() => setMobileOpen(false)}>
                                        <Button
                                            prefixIcon={item.icon}
                                            label={item.label}
                                            size="s"
                                            variant="secondary"
                                        />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    )
}
