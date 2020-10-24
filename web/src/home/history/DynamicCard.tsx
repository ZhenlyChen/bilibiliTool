import { Text, Stack, mergeStyleSets } from "office-ui-fabric-react";
import React, { CSSProperties } from "react";
import moment from "moment";

import playIcon from "../../images/play.svg";
import coinIcon from "../../images/coin.svg";
import collectIcon from "../../images/collect.svg";
import commentIcon from "../../images/comment.svg";
import dmIcon from "../../images/dm.svg";
import likeIcon from "../../images/like.svg";
import shareIcon from "../../images/share.svg";

const getDuration = (d: number) => {
    const hour = Math.floor(d / 60);
    const min = d % 60;
    return (hour < 10 ? "0" : "") + hour + ":" + (min < 10 ? "0" : "") + +min;
};

export const DynamicCard = function (data: any, onClick: (id: string) => void) {
    if (data.BV === undefined) {
        return (
            <div
                style={{
                    marginTop: 24,
                }}
            >
                <Text variant="xLarge">数据加载中...</Text>
            </div>
        );
    }

    let dynamics = [];
    for (const i in data.Dynamics) {
        dynamics.push({
            id: i,
            data: data.Dynamics[i],
            card: JSON.parse(data.Dynamics[i].card)
        });
    }
    dynamics = dynamics.reverse()

    const dynamicsCard = (dynamic: any) => {
        const style = mergeStyleSets({
            title: {
                marginLeft: 6,
                marginTop: 0,
                marginBottom: 6,
                fontSize: 16,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontWeight: "bold",
                color: "#000",
            }
        })
        const type = dynamic.data.desc.type
        if (type === 8 || type === 256) {
            return (<div>
                <p className={style.title}>{moment(dynamic.data.desc.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss")}</p>
                <p style={{marginLeft: 6}}>{dynamic.card.dynamic || dynamic.card.intro}</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '0 8px'
                }}>
                    <img
                        referrerPolicy="no-referrer"
                        src={dynamic.card.pic || dynamic.card.cover}
                        style={{
                            height: 96,
                            width: 154,
                            borderRadius: 4,
                        }}
                    />
                    <p style={{
                        marginTop: 0,
                        marginBottom: 6,
                        fontSize: 16,
                        width: 400,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                        color: "#999",
                    }}
                    >
                        {dynamic.card.title}
                    </p>
                </div>
            </div>)
        } else if (type === 2) {
            console.log(dynamic.card.item)
            return (<div>
                <p className={style.title}>{moment(dynamic.data.desc.timestamp * 1000).format("YYYY-MM-DD HH:mm:ss")}</p>
                <p style={{ whiteSpace: 'break-spaces', marginLeft: 6 }}>{dynamic.card.item.description}</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '0 8px',
                    flexWrap: 'wrap'
                }}>
                    {dynamic.card.item.pictures && dynamic.card.item.pictures.map((pic: any) =>
                        <img
                            referrerPolicy="no-referrer"
                            src={pic.img_src}
                            style={{
                                margin: 12,
                                height: 96,
                                width: 154,
                                borderRadius: 4,
                            }}
                        />
                    )}
                </div>
            </div>)
        } else {
            return <div></div>
        }
    }

    return dynamics.map((v) => {
        const style = mergeStyleSets({
            videoCard: {
                background: "#fff",
                boxShadow:
                    "0 5px 5px 0 rgba(154,160,185,.05), 0 5px 20px 0 rgba(166,173,201,.11)",
                selectors: {
                    ":hover": {
                        boxShadow:
                            "0 5px 5px 0 rgba(154,160,185,.05), 0 5px 30px 0 rgba(166,173,201,.22)",
                    },
                },
                transition: "all .2s",
                cursor: "pointer",
                borderRadius: 4,
                margin: "16px 0",
                minWidth: 540,
                padding: 12,
            },
            block: {
                minWidth: 80,
            },
            icon: {
                height: 16,
                width: 16,
                verticalAlign: "middle",
            },
            text: {
                margin: "6px",
                fontSize: 12,
                verticalAlign: "middle",
                color: "#999999",
            },
        });

        return (
            <Stack
                key={v.data.desc.dynamic_id}
                horizontal
                verticalAlign="center"
                gap={12}
                className={style.videoCard}
                onClick={() => {
                    onClick(v.data.desc.dynamic_id_str);
                }}
            >
                <Stack.Item grow={1}>
                    {dynamicsCard(v)}
                    <Stack
                        horizontal
                        wrap
                        style={{
                            padding: 8,
                        }}
                    >
                        <Stack.Item className={style.block}>
                            <img src={playIcon} className={style.icon} />
                            <Text className={style.text}>{v.data.desc.view}</Text>
                        </Stack.Item>
                        <Stack.Item className={style.block}>
                            <img src={shareIcon} className={style.icon} />
                            <Text className={style.text}>{v.data.desc.repost}</Text>
                        </Stack.Item>
                        <Stack.Item className={style.block}>
                            <img src={commentIcon} className={style.icon} />
                            <Text className={style.text}>{v.data.desc.comment}</Text>
                        </Stack.Item>
                        <Stack.Item className={style.block}>
                            <img src={likeIcon} className={style.icon} />
                            <Text className={style.text}>{v.data.desc.like}</Text>
                        </Stack.Item>
                    </Stack>
                </Stack.Item>
            </Stack>
        );
    });
};
