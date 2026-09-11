import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace mars. */
export namespace mars {

    /**
     * Properties of a Coordinates.
     * @deprecated Use mars.Coordinates.$Properties instead.
     */
    interface ICoordinates extends mars.Coordinates.$Properties {
    }

    /** Represents a Coordinates. */
    class Coordinates {

        /**
         * Constructs a new Coordinates.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.Coordinates.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Coordinates lat. */
        lat: number;

        /** Coordinates lon. */
        lon: number;

        /** Coordinates elevation. */
        elevation: number;

        /**
         * Creates a new Coordinates instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Coordinates instance
         */
        static create(properties: mars.Coordinates.$Shape): mars.Coordinates & mars.Coordinates.$Shape;
        static create(properties?: mars.Coordinates.$Properties): mars.Coordinates;

        /**
         * Encodes the specified Coordinates message. Does not implicitly {@link mars.Coordinates.verify|verify} messages.
         * @param message Coordinates message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.Coordinates.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Coordinates message, length delimited. Does not implicitly {@link mars.Coordinates.verify|verify} messages.
         * @param message Coordinates message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.Coordinates.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Coordinates message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.Coordinates & mars.Coordinates.$Shape} Coordinates
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.Coordinates & mars.Coordinates.$Shape;

        /**
         * Decodes a Coordinates message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.Coordinates & mars.Coordinates.$Shape} Coordinates
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.Coordinates & mars.Coordinates.$Shape;

        /**
         * Verifies a Coordinates message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Coordinates message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Coordinates
         */
        static fromObject(object: { [k: string]: any }): mars.Coordinates;

        /**
         * Creates a plain object from a Coordinates message. Also converts values to other types if specified.
         * @param message Coordinates
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.Coordinates, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Coordinates to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Coordinates
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Coordinates {

        /** Properties of a Coordinates. */
        interface $Properties {

            /** Coordinates lat */
            lat?: (number|null);

            /** Coordinates lon */
            lon?: (number|null);

            /** Coordinates elevation */
            elevation?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Coordinates. */
        type $Shape = mars.Coordinates.$Properties;
    }

    /**
     * Properties of a Distance.
     * @deprecated Use mars.Distance.$Properties instead.
     */
    interface IDistance extends mars.Distance.$Properties {
    }

    /** Represents a Distance. */
    class Distance {

        /**
         * Constructs a new Distance.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.Distance.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Distance totalMeters. */
        totalMeters: number;

        /** Distance totalKm. */
        totalKm: number;

        /**
         * Creates a new Distance instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Distance instance
         */
        static create(properties: mars.Distance.$Shape): mars.Distance & mars.Distance.$Shape;
        static create(properties?: mars.Distance.$Properties): mars.Distance;

        /**
         * Encodes the specified Distance message. Does not implicitly {@link mars.Distance.verify|verify} messages.
         * @param message Distance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.Distance.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Distance message, length delimited. Does not implicitly {@link mars.Distance.verify|verify} messages.
         * @param message Distance message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.Distance.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Distance message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.Distance & mars.Distance.$Shape} Distance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.Distance & mars.Distance.$Shape;

        /**
         * Decodes a Distance message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.Distance & mars.Distance.$Shape} Distance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.Distance & mars.Distance.$Shape;

        /**
         * Verifies a Distance message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Distance message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Distance
         */
        static fromObject(object: { [k: string]: any }): mars.Distance;

        /**
         * Creates a plain object from a Distance message. Also converts values to other types if specified.
         * @param message Distance
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.Distance, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Distance to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Distance
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Distance {

        /** Properties of a Distance. */
        interface $Properties {

            /** Distance totalMeters */
            totalMeters?: (number|null);

            /** Distance totalKm */
            totalKm?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Distance. */
        type $Shape = mars.Distance.$Properties;
    }

    /**
     * Properties of an Attitude.
     * @deprecated Use mars.Attitude.$Properties instead.
     */
    interface IAttitude extends mars.Attitude.$Properties {
    }

    /** Represents an Attitude. */
    class Attitude {

        /**
         * Constructs a new Attitude.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.Attitude.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Attitude roll. */
        roll: number;

        /** Attitude pitch. */
        pitch: number;

        /** Attitude yaw. */
        yaw: number;

        /** Attitude tilt. */
        tilt: number;

        /**
         * Creates a new Attitude instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Attitude instance
         */
        static create(properties: mars.Attitude.$Shape): mars.Attitude & mars.Attitude.$Shape;
        static create(properties?: mars.Attitude.$Properties): mars.Attitude;

        /**
         * Encodes the specified Attitude message. Does not implicitly {@link mars.Attitude.verify|verify} messages.
         * @param message Attitude message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.Attitude.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Attitude message, length delimited. Does not implicitly {@link mars.Attitude.verify|verify} messages.
         * @param message Attitude message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.Attitude.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Attitude message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.Attitude & mars.Attitude.$Shape} Attitude
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.Attitude & mars.Attitude.$Shape;

        /**
         * Decodes an Attitude message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.Attitude & mars.Attitude.$Shape} Attitude
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.Attitude & mars.Attitude.$Shape;

        /**
         * Verifies an Attitude message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Attitude message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Attitude
         */
        static fromObject(object: { [k: string]: any }): mars.Attitude;

        /**
         * Creates a plain object from an Attitude message. Also converts values to other types if specified.
         * @param message Attitude
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.Attitude, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Attitude to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Attitude
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Attitude {

        /** Properties of an Attitude. */
        interface $Properties {

            /** Attitude roll */
            roll?: (number|null);

            /** Attitude pitch */
            pitch?: (number|null);

            /** Attitude yaw */
            yaw?: (number|null);

            /** Attitude tilt */
            tilt?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an Attitude. */
        type $Shape = mars.Attitude.$Properties;
    }

    /**
     * Properties of a TrailPoint.
     * @deprecated Use mars.TrailPoint.$Properties instead.
     */
    interface ITrailPoint extends mars.TrailPoint.$Properties {
    }

    /** Represents a TrailPoint. */
    class TrailPoint {

        /**
         * Constructs a new TrailPoint.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.TrailPoint.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** TrailPoint lon. */
        lon: number;

        /** TrailPoint lat. */
        lat: number;

        /** TrailPoint sol. */
        sol: number;

        /**
         * Creates a new TrailPoint instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TrailPoint instance
         */
        static create(properties: mars.TrailPoint.$Shape): mars.TrailPoint & mars.TrailPoint.$Shape;
        static create(properties?: mars.TrailPoint.$Properties): mars.TrailPoint;

        /**
         * Encodes the specified TrailPoint message. Does not implicitly {@link mars.TrailPoint.verify|verify} messages.
         * @param message TrailPoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.TrailPoint.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TrailPoint message, length delimited. Does not implicitly {@link mars.TrailPoint.verify|verify} messages.
         * @param message TrailPoint message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.TrailPoint.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TrailPoint message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.TrailPoint & mars.TrailPoint.$Shape} TrailPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.TrailPoint & mars.TrailPoint.$Shape;

        /**
         * Decodes a TrailPoint message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.TrailPoint & mars.TrailPoint.$Shape} TrailPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.TrailPoint & mars.TrailPoint.$Shape;

        /**
         * Verifies a TrailPoint message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TrailPoint message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TrailPoint
         */
        static fromObject(object: { [k: string]: any }): mars.TrailPoint;

        /**
         * Creates a plain object from a TrailPoint message. Also converts values to other types if specified.
         * @param message TrailPoint
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.TrailPoint, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TrailPoint to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for TrailPoint
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace TrailPoint {

        /** Properties of a TrailPoint. */
        interface $Properties {

            /** TrailPoint lon */
            lon?: (number|null);

            /** TrailPoint lat */
            lat?: (number|null);

            /** TrailPoint sol */
            sol?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a TrailPoint. */
        type $Shape = mars.TrailPoint.$Properties;
    }

    /**
     * Properties of a RoverData.
     * @deprecated Use mars.RoverData.$Properties instead.
     */
    interface IRoverData extends mars.RoverData.$Properties {
    }

    /** Represents a RoverData. */
    class RoverData {

        /**
         * Constructs a new RoverData.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.RoverData.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RoverData rover. */
        rover: string;

        /** RoverData name. */
        name: string;

        /** RoverData nameEn. */
        nameEn: string;

        /** RoverData site. */
        site: number;

        /** RoverData drive. */
        drive: number;

        /** RoverData sol. */
        sol: number;

        /** RoverData coordinates. */
        coordinates?: (mars.Coordinates.$Properties|null);

        /** RoverData distance. */
        distance?: (mars.Distance.$Properties|null);

        /** RoverData attitude. */
        attitude?: (mars.Attitude.$Properties|null);

        /** RoverData locationName. */
        locationName: string;

        /** RoverData note. */
        note: string;

        /** RoverData waypointsCount. */
        waypointsCount: number;

        /** RoverData recentTrail. */
        recentTrail: mars.TrailPoint.$Properties[];

        /** RoverData updatedAt. */
        updatedAt: string;

        /**
         * Creates a new RoverData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoverData instance
         */
        static create(properties: mars.RoverData.$Shape): mars.RoverData & mars.RoverData.$Shape;
        static create(properties?: mars.RoverData.$Properties): mars.RoverData;

        /**
         * Encodes the specified RoverData message. Does not implicitly {@link mars.RoverData.verify|verify} messages.
         * @param message RoverData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.RoverData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoverData message, length delimited. Does not implicitly {@link mars.RoverData.verify|verify} messages.
         * @param message RoverData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.RoverData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoverData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.RoverData & mars.RoverData.$Shape} RoverData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.RoverData & mars.RoverData.$Shape;

        /**
         * Decodes a RoverData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.RoverData & mars.RoverData.$Shape} RoverData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.RoverData & mars.RoverData.$Shape;

        /**
         * Verifies a RoverData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoverData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoverData
         */
        static fromObject(object: { [k: string]: any }): mars.RoverData;

        /**
         * Creates a plain object from a RoverData message. Also converts values to other types if specified.
         * @param message RoverData
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.RoverData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoverData to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RoverData
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RoverData {

        /** Properties of a RoverData. */
        interface $Properties {

            /** RoverData rover */
            rover?: (string|null);

            /** RoverData name */
            name?: (string|null);

            /** RoverData nameEn */
            nameEn?: (string|null);

            /** RoverData site */
            site?: (number|null);

            /** RoverData drive */
            drive?: (number|null);

            /** RoverData sol */
            sol?: (number|null);

            /** RoverData coordinates */
            coordinates?: (mars.Coordinates.$Properties|null);

            /** RoverData distance */
            distance?: (mars.Distance.$Properties|null);

            /** RoverData attitude */
            attitude?: (mars.Attitude.$Properties|null);

            /** RoverData locationName */
            locationName?: (string|null);

            /** RoverData note */
            note?: (string|null);

            /** RoverData waypointsCount */
            waypointsCount?: (number|null);

            /** RoverData recentTrail */
            recentTrail?: (mars.TrailPoint.$Properties[]|null);

            /** RoverData updatedAt */
            updatedAt?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RoverData. */
        type $Shape = mars.RoverData.$Properties;
    }

    /**
     * Properties of a RoversMap.
     * @deprecated Use mars.RoversMap.$Properties instead.
     */
    interface IRoversMap extends mars.RoversMap.$Properties {
    }

    /** Represents a RoversMap. */
    class RoversMap {

        /**
         * Constructs a new RoversMap.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.RoversMap.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RoversMap perseverance. */
        perseverance?: (mars.RoverData.$Properties|null);

        /** RoversMap curiosity. */
        curiosity?: (mars.RoverData.$Properties|null);

        /**
         * Creates a new RoversMap instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoversMap instance
         */
        static create(properties: mars.RoversMap.$Shape): mars.RoversMap & mars.RoversMap.$Shape;
        static create(properties?: mars.RoversMap.$Properties): mars.RoversMap;

        /**
         * Encodes the specified RoversMap message. Does not implicitly {@link mars.RoversMap.verify|verify} messages.
         * @param message RoversMap message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.RoversMap.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoversMap message, length delimited. Does not implicitly {@link mars.RoversMap.verify|verify} messages.
         * @param message RoversMap message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.RoversMap.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoversMap message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.RoversMap & mars.RoversMap.$Shape} RoversMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.RoversMap & mars.RoversMap.$Shape;

        /**
         * Decodes a RoversMap message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.RoversMap & mars.RoversMap.$Shape} RoversMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.RoversMap & mars.RoversMap.$Shape;

        /**
         * Verifies a RoversMap message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoversMap message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoversMap
         */
        static fromObject(object: { [k: string]: any }): mars.RoversMap;

        /**
         * Creates a plain object from a RoversMap message. Also converts values to other types if specified.
         * @param message RoversMap
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.RoversMap, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoversMap to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RoversMap
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RoversMap {

        /** Properties of a RoversMap. */
        interface $Properties {

            /** RoversMap perseverance */
            perseverance?: (mars.RoverData.$Properties|null);

            /** RoversMap curiosity */
            curiosity?: (mars.RoverData.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RoversMap. */
        type $Shape = mars.RoversMap.$Properties;
    }

    /**
     * Properties of a RoverLocationResponse.
     * @deprecated Use mars.RoverLocationResponse.$Properties instead.
     */
    interface IRoverLocationResponse extends mars.RoverLocationResponse.$Properties {
    }

    /** Represents a RoverLocationResponse. */
    class RoverLocationResponse {

        /**
         * Constructs a new RoverLocationResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.RoverLocationResponse.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** RoverLocationResponse timestamp. */
        timestamp: string;

        /** RoverLocationResponse rovers. */
        rovers?: (mars.RoversMap.$Properties|null);

        /** RoverLocationResponse fallback. */
        fallback: boolean;

        /**
         * Creates a new RoverLocationResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoverLocationResponse instance
         */
        static create(properties: mars.RoverLocationResponse.$Shape): mars.RoverLocationResponse & mars.RoverLocationResponse.$Shape;
        static create(properties?: mars.RoverLocationResponse.$Properties): mars.RoverLocationResponse;

        /**
         * Encodes the specified RoverLocationResponse message. Does not implicitly {@link mars.RoverLocationResponse.verify|verify} messages.
         * @param message RoverLocationResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.RoverLocationResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoverLocationResponse message, length delimited. Does not implicitly {@link mars.RoverLocationResponse.verify|verify} messages.
         * @param message RoverLocationResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.RoverLocationResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoverLocationResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.RoverLocationResponse & mars.RoverLocationResponse.$Shape} RoverLocationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.RoverLocationResponse & mars.RoverLocationResponse.$Shape;

        /**
         * Decodes a RoverLocationResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.RoverLocationResponse & mars.RoverLocationResponse.$Shape} RoverLocationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.RoverLocationResponse & mars.RoverLocationResponse.$Shape;

        /**
         * Verifies a RoverLocationResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoverLocationResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoverLocationResponse
         */
        static fromObject(object: { [k: string]: any }): mars.RoverLocationResponse;

        /**
         * Creates a plain object from a RoverLocationResponse message. Also converts values to other types if specified.
         * @param message RoverLocationResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.RoverLocationResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoverLocationResponse to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for RoverLocationResponse
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace RoverLocationResponse {

        /** Properties of a RoverLocationResponse. */
        interface $Properties {

            /** RoverLocationResponse timestamp */
            timestamp?: (string|null);

            /** RoverLocationResponse rovers */
            rovers?: (mars.RoversMap.$Properties|null);

            /** RoverLocationResponse fallback */
            fallback?: (boolean|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a RoverLocationResponse. */
        type $Shape = mars.RoverLocationResponse.$Properties;
    }

    /**
     * Properties of a Metric.
     * @deprecated Use mars.Metric.$Properties instead.
     */
    interface IMetric extends mars.Metric.$Properties {
    }

    /** Represents a Metric. */
    class Metric {

        /**
         * Constructs a new Metric.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.Metric.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** Metric average. */
        average: number;

        /** Metric min. */
        min: number;

        /** Metric max. */
        max: number;

        /** Metric unit. */
        unit: string;

        /**
         * Creates a new Metric instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Metric instance
         */
        static create(properties: mars.Metric.$Shape): mars.Metric & mars.Metric.$Shape;
        static create(properties?: mars.Metric.$Properties): mars.Metric;

        /**
         * Encodes the specified Metric message. Does not implicitly {@link mars.Metric.verify|verify} messages.
         * @param message Metric message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.Metric.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Metric message, length delimited. Does not implicitly {@link mars.Metric.verify|verify} messages.
         * @param message Metric message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.Metric.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Metric message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.Metric & mars.Metric.$Shape} Metric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.Metric & mars.Metric.$Shape;

        /**
         * Decodes a Metric message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.Metric & mars.Metric.$Shape} Metric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.Metric & mars.Metric.$Shape;

        /**
         * Verifies a Metric message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Metric message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Metric
         */
        static fromObject(object: { [k: string]: any }): mars.Metric;

        /**
         * Creates a plain object from a Metric message. Also converts values to other types if specified.
         * @param message Metric
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.Metric, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Metric to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Metric
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Metric {

        /** Properties of a Metric. */
        interface $Properties {

            /** Metric average */
            average?: (number|null);

            /** Metric min */
            min?: (number|null);

            /** Metric max */
            max?: (number|null);

            /** Metric unit */
            unit?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Metric. */
        type $Shape = mars.Metric.$Properties;
    }

    /**
     * Properties of a PressureMetric.
     * @deprecated Use mars.PressureMetric.$Properties instead.
     */
    interface IPressureMetric extends mars.PressureMetric.$Properties {
    }

    /** Represents a PressureMetric. */
    class PressureMetric {

        /**
         * Constructs a new PressureMetric.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.PressureMetric.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** PressureMetric average. */
        average: number;

        /** PressureMetric min. */
        min: number;

        /** PressureMetric max. */
        max: number;

        /** PressureMetric unit. */
        unit: string;

        /** PressureMetric string. */
        string: string;

        /**
         * Creates a new PressureMetric instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PressureMetric instance
         */
        static create(properties: mars.PressureMetric.$Shape): mars.PressureMetric & mars.PressureMetric.$Shape;
        static create(properties?: mars.PressureMetric.$Properties): mars.PressureMetric;

        /**
         * Encodes the specified PressureMetric message. Does not implicitly {@link mars.PressureMetric.verify|verify} messages.
         * @param message PressureMetric message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.PressureMetric.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PressureMetric message, length delimited. Does not implicitly {@link mars.PressureMetric.verify|verify} messages.
         * @param message PressureMetric message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.PressureMetric.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PressureMetric message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.PressureMetric & mars.PressureMetric.$Shape} PressureMetric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.PressureMetric & mars.PressureMetric.$Shape;

        /**
         * Decodes a PressureMetric message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.PressureMetric & mars.PressureMetric.$Shape} PressureMetric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.PressureMetric & mars.PressureMetric.$Shape;

        /**
         * Verifies a PressureMetric message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PressureMetric message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PressureMetric
         */
        static fromObject(object: { [k: string]: any }): mars.PressureMetric;

        /**
         * Creates a plain object from a PressureMetric message. Also converts values to other types if specified.
         * @param message PressureMetric
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.PressureMetric, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PressureMetric to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for PressureMetric
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace PressureMetric {

        /** Properties of a PressureMetric. */
        interface $Properties {

            /** PressureMetric average */
            average?: (number|null);

            /** PressureMetric min */
            min?: (number|null);

            /** PressureMetric max */
            max?: (number|null);

            /** PressureMetric unit */
            unit?: (string|null);

            /** PressureMetric string */
            string?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a PressureMetric. */
        type $Shape = mars.PressureMetric.$Properties;
    }

    /**
     * Properties of a WindMetric.
     * @deprecated Use mars.WindMetric.$Properties instead.
     */
    interface IWindMetric extends mars.WindMetric.$Properties {
    }

    /** Represents a WindMetric. */
    class WindMetric {

        /**
         * Constructs a new WindMetric.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.WindMetric.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** WindMetric average. */
        average: number;

        /** WindMetric min. */
        min: number;

        /** WindMetric max. */
        max: number;

        /** WindMetric unit. */
        unit: string;

        /** WindMetric mostCommonDirection. */
        mostCommonDirection: string;

        /** WindMetric compassDegrees. */
        compassDegrees: number;

        /**
         * Creates a new WindMetric instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WindMetric instance
         */
        static create(properties: mars.WindMetric.$Shape): mars.WindMetric & mars.WindMetric.$Shape;
        static create(properties?: mars.WindMetric.$Properties): mars.WindMetric;

        /**
         * Encodes the specified WindMetric message. Does not implicitly {@link mars.WindMetric.verify|verify} messages.
         * @param message WindMetric message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.WindMetric.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WindMetric message, length delimited. Does not implicitly {@link mars.WindMetric.verify|verify} messages.
         * @param message WindMetric message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.WindMetric.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WindMetric message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.WindMetric & mars.WindMetric.$Shape} WindMetric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.WindMetric & mars.WindMetric.$Shape;

        /**
         * Decodes a WindMetric message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.WindMetric & mars.WindMetric.$Shape} WindMetric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.WindMetric & mars.WindMetric.$Shape;

        /**
         * Verifies a WindMetric message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WindMetric message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WindMetric
         */
        static fromObject(object: { [k: string]: any }): mars.WindMetric;

        /**
         * Creates a plain object from a WindMetric message. Also converts values to other types if specified.
         * @param message WindMetric
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.WindMetric, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WindMetric to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for WindMetric
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace WindMetric {

        /** Properties of a WindMetric. */
        interface $Properties {

            /** WindMetric average */
            average?: (number|null);

            /** WindMetric min */
            min?: (number|null);

            /** WindMetric max */
            max?: (number|null);

            /** WindMetric unit */
            unit?: (string|null);

            /** WindMetric mostCommonDirection */
            mostCommonDirection?: (string|null);

            /** WindMetric compassDegrees */
            compassDegrees?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a WindMetric. */
        type $Shape = mars.WindMetric.$Properties;
    }

    /**
     * Properties of a LatestWeather.
     * @deprecated Use mars.LatestWeather.$Properties instead.
     */
    interface ILatestWeather extends mars.LatestWeather.$Properties {
    }

    /** Represents a LatestWeather. */
    class LatestWeather {

        /**
         * Constructs a new LatestWeather.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.LatestWeather.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** LatestWeather sol. */
        sol: string;

        /** LatestWeather terrestrialDate. */
        terrestrialDate: string;

        /** LatestWeather season. */
        season: string;

        /** LatestWeather northernSeason. */
        northernSeason: string;

        /** LatestWeather southernSeason. */
        southernSeason: string;

        /** LatestWeather ls. */
        ls: string;

        /** LatestWeather temperature. */
        temperature?: (mars.Metric.$Properties|null);

        /** LatestWeather groundTemperature. */
        groundTemperature?: (mars.Metric.$Properties|null);

        /** LatestWeather pressure. */
        pressure?: (mars.PressureMetric.$Properties|null);

        /** LatestWeather wind. */
        wind?: (mars.WindMetric.$Properties|null);

        /** LatestWeather uvIndex. */
        uvIndex: string;

        /** LatestWeather atmoOpacity. */
        atmoOpacity: string;

        /** LatestWeather sunrise. */
        sunrise: string;

        /** LatestWeather sunset. */
        sunset: string;

        /**
         * Creates a new LatestWeather instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LatestWeather instance
         */
        static create(properties: mars.LatestWeather.$Shape): mars.LatestWeather & mars.LatestWeather.$Shape;
        static create(properties?: mars.LatestWeather.$Properties): mars.LatestWeather;

        /**
         * Encodes the specified LatestWeather message. Does not implicitly {@link mars.LatestWeather.verify|verify} messages.
         * @param message LatestWeather message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.LatestWeather.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LatestWeather message, length delimited. Does not implicitly {@link mars.LatestWeather.verify|verify} messages.
         * @param message LatestWeather message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.LatestWeather.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LatestWeather message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.LatestWeather & mars.LatestWeather.$Shape} LatestWeather
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.LatestWeather & mars.LatestWeather.$Shape;

        /**
         * Decodes a LatestWeather message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.LatestWeather & mars.LatestWeather.$Shape} LatestWeather
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.LatestWeather & mars.LatestWeather.$Shape;

        /**
         * Verifies a LatestWeather message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LatestWeather message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LatestWeather
         */
        static fromObject(object: { [k: string]: any }): mars.LatestWeather;

        /**
         * Creates a plain object from a LatestWeather message. Also converts values to other types if specified.
         * @param message LatestWeather
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.LatestWeather, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LatestWeather to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for LatestWeather
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace LatestWeather {

        /** Properties of a LatestWeather. */
        interface $Properties {

            /** LatestWeather sol */
            sol?: (string|null);

            /** LatestWeather terrestrialDate */
            terrestrialDate?: (string|null);

            /** LatestWeather season */
            season?: (string|null);

            /** LatestWeather northernSeason */
            northernSeason?: (string|null);

            /** LatestWeather southernSeason */
            southernSeason?: (string|null);

            /** LatestWeather ls */
            ls?: (string|null);

            /** LatestWeather temperature */
            temperature?: (mars.Metric.$Properties|null);

            /** LatestWeather groundTemperature */
            groundTemperature?: (mars.Metric.$Properties|null);

            /** LatestWeather pressure */
            pressure?: (mars.PressureMetric.$Properties|null);

            /** LatestWeather wind */
            wind?: (mars.WindMetric.$Properties|null);

            /** LatestWeather uvIndex */
            uvIndex?: (string|null);

            /** LatestWeather atmoOpacity */
            atmoOpacity?: (string|null);

            /** LatestWeather sunrise */
            sunrise?: (string|null);

            /** LatestWeather sunset */
            sunset?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a LatestWeather. */
        type $Shape = mars.LatestWeather.$Properties;
    }

    /**
     * Properties of a WeatherHistory.
     * @deprecated Use mars.WeatherHistory.$Properties instead.
     */
    interface IWeatherHistory extends mars.WeatherHistory.$Properties {
    }

    /** Represents a WeatherHistory. */
    class WeatherHistory {

        /**
         * Constructs a new WeatherHistory.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.WeatherHistory.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** WeatherHistory sol. */
        sol: string;

        /** WeatherHistory date. */
        date: string;

        /** WeatherHistory minTemp. */
        minTemp: number;

        /** WeatherHistory maxTemp. */
        maxTemp: number;

        /** WeatherHistory minGts. */
        minGts: number;

        /** WeatherHistory maxGts. */
        maxGts: number;

        /** WeatherHistory pressure. */
        pressure: number;

        /** WeatherHistory uv. */
        uv: string;

        /**
         * Creates a new WeatherHistory instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WeatherHistory instance
         */
        static create(properties: mars.WeatherHistory.$Shape): mars.WeatherHistory & mars.WeatherHistory.$Shape;
        static create(properties?: mars.WeatherHistory.$Properties): mars.WeatherHistory;

        /**
         * Encodes the specified WeatherHistory message. Does not implicitly {@link mars.WeatherHistory.verify|verify} messages.
         * @param message WeatherHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.WeatherHistory.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WeatherHistory message, length delimited. Does not implicitly {@link mars.WeatherHistory.verify|verify} messages.
         * @param message WeatherHistory message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.WeatherHistory.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WeatherHistory message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.WeatherHistory & mars.WeatherHistory.$Shape} WeatherHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.WeatherHistory & mars.WeatherHistory.$Shape;

        /**
         * Decodes a WeatherHistory message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.WeatherHistory & mars.WeatherHistory.$Shape} WeatherHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.WeatherHistory & mars.WeatherHistory.$Shape;

        /**
         * Verifies a WeatherHistory message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WeatherHistory message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WeatherHistory
         */
        static fromObject(object: { [k: string]: any }): mars.WeatherHistory;

        /**
         * Creates a plain object from a WeatherHistory message. Also converts values to other types if specified.
         * @param message WeatherHistory
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.WeatherHistory, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WeatherHistory to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for WeatherHistory
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace WeatherHistory {

        /** Properties of a WeatherHistory. */
        interface $Properties {

            /** WeatherHistory sol */
            sol?: (string|null);

            /** WeatherHistory date */
            date?: (string|null);

            /** WeatherHistory minTemp */
            minTemp?: (number|null);

            /** WeatherHistory maxTemp */
            maxTemp?: (number|null);

            /** WeatherHistory minGts */
            minGts?: (number|null);

            /** WeatherHistory maxGts */
            maxGts?: (number|null);

            /** WeatherHistory pressure */
            pressure?: (number|null);

            /** WeatherHistory uv */
            uv?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a WeatherHistory. */
        type $Shape = mars.WeatherHistory.$Properties;
    }

    /**
     * Properties of a StationData.
     * @deprecated Use mars.StationData.$Properties instead.
     */
    interface IStationData extends mars.StationData.$Properties {
    }

    /** Represents a StationData. */
    class StationData {

        /**
         * Constructs a new StationData.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.StationData.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** StationData station. */
        station: string;

        /** StationData rover. */
        rover: string;

        /** StationData name. */
        name: string;

        /** StationData nameEn. */
        nameEn: string;

        /** StationData status. */
        status: string;

        /** StationData instrument. */
        instrument: string;

        /** StationData location. */
        location: string;

        /** StationData note. */
        note: string;

        /** StationData latest. */
        latest?: (mars.LatestWeather.$Properties|null);

        /** StationData history. */
        history: mars.WeatherHistory.$Properties[];

        /**
         * Creates a new StationData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StationData instance
         */
        static create(properties: mars.StationData.$Shape): mars.StationData & mars.StationData.$Shape;
        static create(properties?: mars.StationData.$Properties): mars.StationData;

        /**
         * Encodes the specified StationData message. Does not implicitly {@link mars.StationData.verify|verify} messages.
         * @param message StationData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.StationData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StationData message, length delimited. Does not implicitly {@link mars.StationData.verify|verify} messages.
         * @param message StationData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.StationData.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StationData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.StationData & mars.StationData.$Shape} StationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.StationData & mars.StationData.$Shape;

        /**
         * Decodes a StationData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.StationData & mars.StationData.$Shape} StationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.StationData & mars.StationData.$Shape;

        /**
         * Verifies a StationData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StationData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StationData
         */
        static fromObject(object: { [k: string]: any }): mars.StationData;

        /**
         * Creates a plain object from a StationData message. Also converts values to other types if specified.
         * @param message StationData
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.StationData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StationData to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for StationData
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace StationData {

        /** Properties of a StationData. */
        interface $Properties {

            /** StationData station */
            station?: (string|null);

            /** StationData rover */
            rover?: (string|null);

            /** StationData name */
            name?: (string|null);

            /** StationData nameEn */
            nameEn?: (string|null);

            /** StationData status */
            status?: (string|null);

            /** StationData instrument */
            instrument?: (string|null);

            /** StationData location */
            location?: (string|null);

            /** StationData note */
            note?: (string|null);

            /** StationData latest */
            latest?: (mars.LatestWeather.$Properties|null);

            /** StationData history */
            history?: (mars.WeatherHistory.$Properties[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a StationData. */
        type $Shape = mars.StationData.$Properties;
    }

    /**
     * Properties of a StationsMap.
     * @deprecated Use mars.StationsMap.$Properties instead.
     */
    interface IStationsMap extends mars.StationsMap.$Properties {
    }

    /** Represents a StationsMap. */
    class StationsMap {

        /**
         * Constructs a new StationsMap.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.StationsMap.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** StationsMap perseverance. */
        perseverance?: (mars.StationData.$Properties|null);

        /** StationsMap curiosity. */
        curiosity?: (mars.StationData.$Properties|null);

        /** StationsMap insight. */
        insight?: (mars.StationData.$Properties|null);

        /**
         * Creates a new StationsMap instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StationsMap instance
         */
        static create(properties: mars.StationsMap.$Shape): mars.StationsMap & mars.StationsMap.$Shape;
        static create(properties?: mars.StationsMap.$Properties): mars.StationsMap;

        /**
         * Encodes the specified StationsMap message. Does not implicitly {@link mars.StationsMap.verify|verify} messages.
         * @param message StationsMap message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.StationsMap.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StationsMap message, length delimited. Does not implicitly {@link mars.StationsMap.verify|verify} messages.
         * @param message StationsMap message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.StationsMap.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StationsMap message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.StationsMap & mars.StationsMap.$Shape} StationsMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.StationsMap & mars.StationsMap.$Shape;

        /**
         * Decodes a StationsMap message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.StationsMap & mars.StationsMap.$Shape} StationsMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.StationsMap & mars.StationsMap.$Shape;

        /**
         * Verifies a StationsMap message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StationsMap message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StationsMap
         */
        static fromObject(object: { [k: string]: any }): mars.StationsMap;

        /**
         * Creates a plain object from a StationsMap message. Also converts values to other types if specified.
         * @param message StationsMap
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.StationsMap, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StationsMap to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for StationsMap
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace StationsMap {

        /** Properties of a StationsMap. */
        interface $Properties {

            /** StationsMap perseverance */
            perseverance?: (mars.StationData.$Properties|null);

            /** StationsMap curiosity */
            curiosity?: (mars.StationData.$Properties|null);

            /** StationsMap insight */
            insight?: (mars.StationData.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a StationsMap. */
        type $Shape = mars.StationsMap.$Properties;
    }

    /**
     * Properties of a WeatherResponse.
     * @deprecated Use mars.WeatherResponse.$Properties instead.
     */
    interface IWeatherResponse extends mars.WeatherResponse.$Properties {
    }

    /** Represents a WeatherResponse. */
    class WeatherResponse {

        /**
         * Constructs a new WeatherResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: mars.WeatherResponse.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** WeatherResponse timestamp. */
        timestamp: string;

        /** WeatherResponse stations. */
        stations?: (mars.StationsMap.$Properties|null);

        /**
         * Creates a new WeatherResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WeatherResponse instance
         */
        static create(properties: mars.WeatherResponse.$Shape): mars.WeatherResponse & mars.WeatherResponse.$Shape;
        static create(properties?: mars.WeatherResponse.$Properties): mars.WeatherResponse;

        /**
         * Encodes the specified WeatherResponse message. Does not implicitly {@link mars.WeatherResponse.verify|verify} messages.
         * @param message WeatherResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: mars.WeatherResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WeatherResponse message, length delimited. Does not implicitly {@link mars.WeatherResponse.verify|verify} messages.
         * @param message WeatherResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: mars.WeatherResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WeatherResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {mars.WeatherResponse & mars.WeatherResponse.$Shape} WeatherResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): mars.WeatherResponse & mars.WeatherResponse.$Shape;

        /**
         * Decodes a WeatherResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {mars.WeatherResponse & mars.WeatherResponse.$Shape} WeatherResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): mars.WeatherResponse & mars.WeatherResponse.$Shape;

        /**
         * Verifies a WeatherResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WeatherResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WeatherResponse
         */
        static fromObject(object: { [k: string]: any }): mars.WeatherResponse;

        /**
         * Creates a plain object from a WeatherResponse message. Also converts values to other types if specified.
         * @param message WeatherResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: mars.WeatherResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WeatherResponse to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for WeatherResponse
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace WeatherResponse {

        /** Properties of a WeatherResponse. */
        interface $Properties {

            /** WeatherResponse timestamp */
            timestamp?: (string|null);

            /** WeatherResponse stations */
            stations?: (mars.StationsMap.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a WeatherResponse. */
        type $Shape = mars.WeatherResponse.$Properties;
    }
}
