
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    echarts.registerTheme('walden', {
        "color": [
            "rgba(252,127,9,0.97)", 
            "#09b7b4",
            "#ec4e67",
            "#005ba2",
            "#312d57",
            "rgba(252,127,9,0.65)"
        ],
        "backgroundColor": "#f2f2f7",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#666666"
            },
            "subtextStyle": {
                "color": "#999999"
            }
        },
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "3"
                }
            },
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "smooth": false
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "2"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "3"
                }
            },
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "smooth": false
        },
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": "0",
                    "barBorderColor": "#666666"
                },
                "emphasis": {
                    "barBorderWidth": "0",
                    "barBorderColor": "#666666"
                }
            }
        },
        "pie": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                }
            }
        },
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                }
            }
        },
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                }
            }
        },
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                }
            }
        },
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                }
            }
        },
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                }
            }
        },
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                },
                "emphasis": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#e6a0d2",
                    "color0": "transparent",
                    "borderColor": "#e6a0d2",
                    "borderColor0": "#3fb1e3",
                    "borderWidth": "2"
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "0",
                    "borderColor": "#666666"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "1",
                    "color": "#cccccc"
                }
            },
            "symbolSize": "8",
            "symbol": "emptyCircle",
            "smooth": false,
            "color": [
                "#2756a6",
                "#09b7b4",
                "#312d57",
                "rgba(252,127,9,0.97)",
                "rgba(252,127,9,0.65)",
                "#ff0600"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#666666"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#eeeeee",
                    "borderColor": "#aaaaaa",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(63,177,227,0.25)",
                    "borderColor": "#3fb1e3",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(63,177,227)"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#eeeeee",
                    "borderColor": "#aaaaaa",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(63,177,227,0.25)",
                    "borderColor": "#3fb1e3",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#ffffff"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(63,177,227)"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#666666"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#666666"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#666666"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#666666"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#666666"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#666666"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#666666"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#666666"
                }
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": [
                        "#eeeeee"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#999999"
                },
                "emphasis": {
                    "borderColor": "#666666"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#999999"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#cccccc",
                    "width": 1
                },
                "crossStyle": {
                    "color": "#cccccc",
                    "width": 1
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#626c91",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#626c91",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#626c91"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#626c91",
                    "borderColor": "#626c91",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#626c91",
                    "borderColor": "#626c91",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#3fb1e3",
                "borderColor": "rgba(63,177,227,0.15)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#626c91"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#626c91"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#afe8ff",
                "#afe8ff"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(255,255,255,0)",
            "dataBackgroundColor": "rgba(222,222,222,1)",
            "fillerColor": "rgba(114,230,212,0.25)",
            "handleColor": "#cccccc",
            "handleSize": "100%",
            "textStyle": {
                "color": "#999999"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#666666"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#666666"
                    }
                }
            }
        }
    });
}));
