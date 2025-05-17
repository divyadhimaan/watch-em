import React, { useRef, useState, useEffect } from 'react'
import {
    Button,
    IconButton,
    Flex,
    Background,
} from "@/once-ui/components";

import { TAGS } from "@/resources/tags";
import styles from "@/components/filter.module.scss";

import Link from "next/link";


export const Filter = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

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

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        checkScroll(); // initial check

        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    return (
        <>
            {TAGS.length > 0 && (
                <div className={styles.wrapper}>
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
                        <Flex paddingTop="20" paddingBottom="8" gap="8" horizontal="start" fitWidth >
                            {TAGS.map(
                                (item) =>
                                    item.link && (
                                        <React.Fragment key={item.label}>
                                            <Link href={`/filter/${item.value}` || slugify(item.label)}>
                                            <Button
                                                className="s-flex-hide"
                                                key={item.label}
                                                prefixIcon={item.icon}
                                                label={item.label}
                                                size="l"
                                                variant="secondary"
                                            />
                                            </Link>
                                            <Link href={`/filter/${item.value}` || slugify(item.label)}>
                                            <IconButton
                                                className="s-flex-show"
                                                size="l"
                                                key={`${item.label}-icon`}
                                                icon={item.icon}
                                                variant="secondary"
                                            />
                                            </Link>
                                            
                                        </React.Fragment>
                                    ),

                            )}
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
            )}
        </>
    )
}

