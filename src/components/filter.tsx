import React, { useRef } from 'react'
import {
    Button,
    IconButton,
    Flex,
} from "@/once-ui/components";

import { TAGS } from "@/resources/tags";
import styles from "@/components/filter.module.scss";


export const Filter = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 200,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            {TAGS.length > 0 && (
                <div className={styles.scrollWrapper}>

                    <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" horizontal="start" fitWidth>
                        {TAGS.map(
                            (item) =>
                                item.link && (
                                    <React.Fragment key={item.label}>
                                        <Button
                                            className="s-flex-hide"
                                            key={item.label}
                                            href={item.link}
                                            prefixIcon={item.icon}
                                            label={item.label}
                                            size="m"
                                            variant="secondary"
                                        />
                                        <IconButton
                                            className="s-flex-show"
                                            size="l"
                                            key={`${item.label}-icon`}
                                            href={item.link}
                                            icon={item.icon}
                                            variant="secondary"
                                        />
                                    </React.Fragment>
                                ),
                        )}
                    </Flex>
                </div>
            )}
        </>
    )
}

