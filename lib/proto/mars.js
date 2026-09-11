/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
var $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $RangeError = $util.global.RangeError, $TypeError = $util.global.TypeError, $Number = $util.global.Number, $isFinite = $util.global.isFinite, $String = $util.global.String, $Array = $util.global.Array, $Boolean = $util.global.Boolean;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.mars = (function() {

    /**
     * Namespace mars.
     * @exports mars
     * @namespace
     */
    var mars = {};

    mars.Coordinates = (function() {

        /**
         * Properties of a Coordinates.
         * @typedef {Object} mars.Coordinates.$Properties
         * @property {number|null} [lat] Coordinates lat
         * @property {number|null} [lon] Coordinates lon
         * @property {number|null} [elevation] Coordinates elevation
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a Coordinates.
         * @memberof mars
         * @interface ICoordinates
         * @augments mars.Coordinates.$Properties
         * @deprecated Use mars.Coordinates.$Properties instead.
         */

        /**
         * Shape of a Coordinates.
         * @typedef {mars.Coordinates.$Properties} mars.Coordinates.$Shape
         */

        /**
         * Constructs a new Coordinates.
         * @memberof mars
         * @classdesc Represents a Coordinates.
         * @constructor
         * @param {mars.Coordinates.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var Coordinates = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Coordinates lat.
         * @member {number} lat
         * @memberof mars.Coordinates
         * @instance
         */
        Coordinates.prototype.lat = 0;

        /**
         * Coordinates lon.
         * @member {number} lon
         * @memberof mars.Coordinates
         * @instance
         */
        Coordinates.prototype.lon = 0;

        /**
         * Coordinates elevation.
         * @member {number} elevation
         * @memberof mars.Coordinates
         * @instance
         */
        Coordinates.prototype.elevation = 0;

        /**
         * Creates a new Coordinates instance using the specified properties.
         * @function create
         * @memberof mars.Coordinates
         * @static
         * @param {mars.Coordinates.$Properties=} [properties] Properties to set
         * @returns {mars.Coordinates} Coordinates instance
         * @type {{
         *   (properties: mars.Coordinates.$Shape): mars.Coordinates & mars.Coordinates.$Shape;
         *   (properties?: mars.Coordinates.$Properties): mars.Coordinates;
         * }}
         */
        Coordinates.create = function(properties) {
            return new Coordinates(properties);
        };

        /**
         * Encodes the specified Coordinates message. Does not implicitly {@link mars.Coordinates.verify|verify} messages.
         * @function encode
         * @memberof mars.Coordinates
         * @static
         * @param {mars.Coordinates.$Properties} message Coordinates message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coordinates.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.lat != null && $Object.hasOwnProperty.call(message, "lat") && !$Object.is(message.lat, 0))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.lat);
            if (message.lon != null && $Object.hasOwnProperty.call(message, "lon") && !$Object.is(message.lon, 0))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.lon);
            if (message.elevation != null && $Object.hasOwnProperty.call(message, "elevation") && !$Object.is(message.elevation, 0))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.elevation);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Coordinates message, length delimited. Does not implicitly {@link mars.Coordinates.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.Coordinates
         * @static
         * @param {mars.Coordinates.$Properties} message Coordinates message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Coordinates.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a Coordinates message from the specified reader or buffer.
         * @function decode
         * @memberof mars.Coordinates
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.Coordinates & mars.Coordinates.$Shape} Coordinates
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coordinates.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.Coordinates();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.lat = value;
                        else
                            delete message.lat;
                        continue;
                    }
                case 2: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.lon = value;
                        else
                            delete message.lon;
                        continue;
                    }
                case 3: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.elevation = value;
                        else
                            delete message.elevation;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a Coordinates message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.Coordinates
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.Coordinates & mars.Coordinates.$Shape} Coordinates
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Coordinates.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Coordinates message.
         * @function verify
         * @memberof mars.Coordinates
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Coordinates.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.lat != null && $Object.hasOwnProperty.call(message, "lat"))
                if (typeof message.lat !== "number")
                    return "lat: number expected";
            if (message.lon != null && $Object.hasOwnProperty.call(message, "lon"))
                if (typeof message.lon !== "number")
                    return "lon: number expected";
            if (message.elevation != null && $Object.hasOwnProperty.call(message, "elevation"))
                if (typeof message.elevation !== "number")
                    return "elevation: number expected";
            return null;
        };

        /**
         * Creates a Coordinates message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.Coordinates
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.Coordinates} Coordinates
         */
        Coordinates.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.Coordinates)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.Coordinates: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.Coordinates();
            if (object.lat != null)
                if (!$Object.is($Number(object.lat), 0))
                    message.lat = $Number(object.lat);
            if (object.lon != null)
                if (!$Object.is($Number(object.lon), 0))
                    message.lon = $Number(object.lon);
            if (object.elevation != null)
                if (!$Object.is($Number(object.elevation), 0))
                    message.elevation = $Number(object.elevation);
            return message;
        };

        /**
         * Creates a plain object from a Coordinates message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.Coordinates
         * @static
         * @param {mars.Coordinates} message Coordinates
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Coordinates.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.lat = 0;
                object.lon = 0;
                object.elevation = 0;
            }
            if (message.lat != null && $Object.hasOwnProperty.call(message, "lat"))
                object.lat = options.json && !$isFinite(message.lat) ? $String(message.lat) : message.lat;
            if (message.lon != null && $Object.hasOwnProperty.call(message, "lon"))
                object.lon = options.json && !$isFinite(message.lon) ? $String(message.lon) : message.lon;
            if (message.elevation != null && $Object.hasOwnProperty.call(message, "elevation"))
                object.elevation = options.json && !$isFinite(message.elevation) ? $String(message.elevation) : message.elevation;
            return object;
        };

        /**
         * Converts this Coordinates to JSON.
         * @function toJSON
         * @memberof mars.Coordinates
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Coordinates.prototype.toJSON = function() {
            return Coordinates.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Coordinates
         * @function getTypeUrl
         * @memberof mars.Coordinates
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Coordinates.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.Coordinates";
        };

        return Coordinates;
    })();

    mars.Distance = (function() {

        /**
         * Properties of a Distance.
         * @typedef {Object} mars.Distance.$Properties
         * @property {number|null} [totalMeters] Distance totalMeters
         * @property {number|null} [totalKm] Distance totalKm
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a Distance.
         * @memberof mars
         * @interface IDistance
         * @augments mars.Distance.$Properties
         * @deprecated Use mars.Distance.$Properties instead.
         */

        /**
         * Shape of a Distance.
         * @typedef {mars.Distance.$Properties} mars.Distance.$Shape
         */

        /**
         * Constructs a new Distance.
         * @memberof mars
         * @classdesc Represents a Distance.
         * @constructor
         * @param {mars.Distance.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var Distance = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Distance totalMeters.
         * @member {number} totalMeters
         * @memberof mars.Distance
         * @instance
         */
        Distance.prototype.totalMeters = 0;

        /**
         * Distance totalKm.
         * @member {number} totalKm
         * @memberof mars.Distance
         * @instance
         */
        Distance.prototype.totalKm = 0;

        /**
         * Creates a new Distance instance using the specified properties.
         * @function create
         * @memberof mars.Distance
         * @static
         * @param {mars.Distance.$Properties=} [properties] Properties to set
         * @returns {mars.Distance} Distance instance
         * @type {{
         *   (properties: mars.Distance.$Shape): mars.Distance & mars.Distance.$Shape;
         *   (properties?: mars.Distance.$Properties): mars.Distance;
         * }}
         */
        Distance.create = function(properties) {
            return new Distance(properties);
        };

        /**
         * Encodes the specified Distance message. Does not implicitly {@link mars.Distance.verify|verify} messages.
         * @function encode
         * @memberof mars.Distance
         * @static
         * @param {mars.Distance.$Properties} message Distance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Distance.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.totalMeters != null && $Object.hasOwnProperty.call(message, "totalMeters") && !$Object.is(message.totalMeters, 0))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.totalMeters);
            if (message.totalKm != null && $Object.hasOwnProperty.call(message, "totalKm") && !$Object.is(message.totalKm, 0))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.totalKm);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Distance message, length delimited. Does not implicitly {@link mars.Distance.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.Distance
         * @static
         * @param {mars.Distance.$Properties} message Distance message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Distance.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a Distance message from the specified reader or buffer.
         * @function decode
         * @memberof mars.Distance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.Distance & mars.Distance.$Shape} Distance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Distance.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.Distance();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.totalMeters = value;
                        else
                            delete message.totalMeters;
                        continue;
                    }
                case 2: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.totalKm = value;
                        else
                            delete message.totalKm;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a Distance message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.Distance
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.Distance & mars.Distance.$Shape} Distance
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Distance.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Distance message.
         * @function verify
         * @memberof mars.Distance
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Distance.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.totalMeters != null && $Object.hasOwnProperty.call(message, "totalMeters"))
                if (typeof message.totalMeters !== "number")
                    return "totalMeters: number expected";
            if (message.totalKm != null && $Object.hasOwnProperty.call(message, "totalKm"))
                if (typeof message.totalKm !== "number")
                    return "totalKm: number expected";
            return null;
        };

        /**
         * Creates a Distance message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.Distance
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.Distance} Distance
         */
        Distance.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.Distance)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.Distance: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.Distance();
            if (object.totalMeters != null)
                if (!$Object.is($Number(object.totalMeters), 0))
                    message.totalMeters = $Number(object.totalMeters);
            if (object.totalKm != null)
                if (!$Object.is($Number(object.totalKm), 0))
                    message.totalKm = $Number(object.totalKm);
            return message;
        };

        /**
         * Creates a plain object from a Distance message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.Distance
         * @static
         * @param {mars.Distance} message Distance
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Distance.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.totalMeters = 0;
                object.totalKm = 0;
            }
            if (message.totalMeters != null && $Object.hasOwnProperty.call(message, "totalMeters"))
                object.totalMeters = options.json && !$isFinite(message.totalMeters) ? $String(message.totalMeters) : message.totalMeters;
            if (message.totalKm != null && $Object.hasOwnProperty.call(message, "totalKm"))
                object.totalKm = options.json && !$isFinite(message.totalKm) ? $String(message.totalKm) : message.totalKm;
            return object;
        };

        /**
         * Converts this Distance to JSON.
         * @function toJSON
         * @memberof mars.Distance
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Distance.prototype.toJSON = function() {
            return Distance.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Distance
         * @function getTypeUrl
         * @memberof mars.Distance
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Distance.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.Distance";
        };

        return Distance;
    })();

    mars.Attitude = (function() {

        /**
         * Properties of an Attitude.
         * @typedef {Object} mars.Attitude.$Properties
         * @property {number|null} [roll] Attitude roll
         * @property {number|null} [pitch] Attitude pitch
         * @property {number|null} [yaw] Attitude yaw
         * @property {number|null} [tilt] Attitude tilt
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of an Attitude.
         * @memberof mars
         * @interface IAttitude
         * @augments mars.Attitude.$Properties
         * @deprecated Use mars.Attitude.$Properties instead.
         */

        /**
         * Shape of an Attitude.
         * @typedef {mars.Attitude.$Properties} mars.Attitude.$Shape
         */

        /**
         * Constructs a new Attitude.
         * @memberof mars
         * @classdesc Represents an Attitude.
         * @constructor
         * @param {mars.Attitude.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var Attitude = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Attitude roll.
         * @member {number} roll
         * @memberof mars.Attitude
         * @instance
         */
        Attitude.prototype.roll = 0;

        /**
         * Attitude pitch.
         * @member {number} pitch
         * @memberof mars.Attitude
         * @instance
         */
        Attitude.prototype.pitch = 0;

        /**
         * Attitude yaw.
         * @member {number} yaw
         * @memberof mars.Attitude
         * @instance
         */
        Attitude.prototype.yaw = 0;

        /**
         * Attitude tilt.
         * @member {number} tilt
         * @memberof mars.Attitude
         * @instance
         */
        Attitude.prototype.tilt = 0;

        /**
         * Creates a new Attitude instance using the specified properties.
         * @function create
         * @memberof mars.Attitude
         * @static
         * @param {mars.Attitude.$Properties=} [properties] Properties to set
         * @returns {mars.Attitude} Attitude instance
         * @type {{
         *   (properties: mars.Attitude.$Shape): mars.Attitude & mars.Attitude.$Shape;
         *   (properties?: mars.Attitude.$Properties): mars.Attitude;
         * }}
         */
        Attitude.create = function(properties) {
            return new Attitude(properties);
        };

        /**
         * Encodes the specified Attitude message. Does not implicitly {@link mars.Attitude.verify|verify} messages.
         * @function encode
         * @memberof mars.Attitude
         * @static
         * @param {mars.Attitude.$Properties} message Attitude message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Attitude.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.roll != null && $Object.hasOwnProperty.call(message, "roll") && !$Object.is(message.roll, 0))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.roll);
            if (message.pitch != null && $Object.hasOwnProperty.call(message, "pitch") && !$Object.is(message.pitch, 0))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.pitch);
            if (message.yaw != null && $Object.hasOwnProperty.call(message, "yaw") && !$Object.is(message.yaw, 0))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.yaw);
            if (message.tilt != null && $Object.hasOwnProperty.call(message, "tilt") && !$Object.is(message.tilt, 0))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.tilt);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Attitude message, length delimited. Does not implicitly {@link mars.Attitude.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.Attitude
         * @static
         * @param {mars.Attitude.$Properties} message Attitude message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Attitude.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes an Attitude message from the specified reader or buffer.
         * @function decode
         * @memberof mars.Attitude
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.Attitude & mars.Attitude.$Shape} Attitude
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Attitude.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.Attitude();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.roll = value;
                        else
                            delete message.roll;
                        continue;
                    }
                case 2: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.pitch = value;
                        else
                            delete message.pitch;
                        continue;
                    }
                case 3: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.yaw = value;
                        else
                            delete message.yaw;
                        continue;
                    }
                case 4: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.tilt = value;
                        else
                            delete message.tilt;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes an Attitude message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.Attitude
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.Attitude & mars.Attitude.$Shape} Attitude
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Attitude.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Attitude message.
         * @function verify
         * @memberof mars.Attitude
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Attitude.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.roll != null && $Object.hasOwnProperty.call(message, "roll"))
                if (typeof message.roll !== "number")
                    return "roll: number expected";
            if (message.pitch != null && $Object.hasOwnProperty.call(message, "pitch"))
                if (typeof message.pitch !== "number")
                    return "pitch: number expected";
            if (message.yaw != null && $Object.hasOwnProperty.call(message, "yaw"))
                if (typeof message.yaw !== "number")
                    return "yaw: number expected";
            if (message.tilt != null && $Object.hasOwnProperty.call(message, "tilt"))
                if (typeof message.tilt !== "number")
                    return "tilt: number expected";
            return null;
        };

        /**
         * Creates an Attitude message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.Attitude
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.Attitude} Attitude
         */
        Attitude.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.Attitude)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.Attitude: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.Attitude();
            if (object.roll != null)
                if (!$Object.is($Number(object.roll), 0))
                    message.roll = $Number(object.roll);
            if (object.pitch != null)
                if (!$Object.is($Number(object.pitch), 0))
                    message.pitch = $Number(object.pitch);
            if (object.yaw != null)
                if (!$Object.is($Number(object.yaw), 0))
                    message.yaw = $Number(object.yaw);
            if (object.tilt != null)
                if (!$Object.is($Number(object.tilt), 0))
                    message.tilt = $Number(object.tilt);
            return message;
        };

        /**
         * Creates a plain object from an Attitude message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.Attitude
         * @static
         * @param {mars.Attitude} message Attitude
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Attitude.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.roll = 0;
                object.pitch = 0;
                object.yaw = 0;
                object.tilt = 0;
            }
            if (message.roll != null && $Object.hasOwnProperty.call(message, "roll"))
                object.roll = options.json && !$isFinite(message.roll) ? $String(message.roll) : message.roll;
            if (message.pitch != null && $Object.hasOwnProperty.call(message, "pitch"))
                object.pitch = options.json && !$isFinite(message.pitch) ? $String(message.pitch) : message.pitch;
            if (message.yaw != null && $Object.hasOwnProperty.call(message, "yaw"))
                object.yaw = options.json && !$isFinite(message.yaw) ? $String(message.yaw) : message.yaw;
            if (message.tilt != null && $Object.hasOwnProperty.call(message, "tilt"))
                object.tilt = options.json && !$isFinite(message.tilt) ? $String(message.tilt) : message.tilt;
            return object;
        };

        /**
         * Converts this Attitude to JSON.
         * @function toJSON
         * @memberof mars.Attitude
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Attitude.prototype.toJSON = function() {
            return Attitude.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Attitude
         * @function getTypeUrl
         * @memberof mars.Attitude
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Attitude.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.Attitude";
        };

        return Attitude;
    })();

    mars.TrailPoint = (function() {

        /**
         * Properties of a TrailPoint.
         * @typedef {Object} mars.TrailPoint.$Properties
         * @property {number|null} [lon] TrailPoint lon
         * @property {number|null} [lat] TrailPoint lat
         * @property {number|null} [sol] TrailPoint sol
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a TrailPoint.
         * @memberof mars
         * @interface ITrailPoint
         * @augments mars.TrailPoint.$Properties
         * @deprecated Use mars.TrailPoint.$Properties instead.
         */

        /**
         * Shape of a TrailPoint.
         * @typedef {mars.TrailPoint.$Properties} mars.TrailPoint.$Shape
         */

        /**
         * Constructs a new TrailPoint.
         * @memberof mars
         * @classdesc Represents a TrailPoint.
         * @constructor
         * @param {mars.TrailPoint.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var TrailPoint = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * TrailPoint lon.
         * @member {number} lon
         * @memberof mars.TrailPoint
         * @instance
         */
        TrailPoint.prototype.lon = 0;

        /**
         * TrailPoint lat.
         * @member {number} lat
         * @memberof mars.TrailPoint
         * @instance
         */
        TrailPoint.prototype.lat = 0;

        /**
         * TrailPoint sol.
         * @member {number} sol
         * @memberof mars.TrailPoint
         * @instance
         */
        TrailPoint.prototype.sol = 0;

        /**
         * Creates a new TrailPoint instance using the specified properties.
         * @function create
         * @memberof mars.TrailPoint
         * @static
         * @param {mars.TrailPoint.$Properties=} [properties] Properties to set
         * @returns {mars.TrailPoint} TrailPoint instance
         * @type {{
         *   (properties: mars.TrailPoint.$Shape): mars.TrailPoint & mars.TrailPoint.$Shape;
         *   (properties?: mars.TrailPoint.$Properties): mars.TrailPoint;
         * }}
         */
        TrailPoint.create = function(properties) {
            return new TrailPoint(properties);
        };

        /**
         * Encodes the specified TrailPoint message. Does not implicitly {@link mars.TrailPoint.verify|verify} messages.
         * @function encode
         * @memberof mars.TrailPoint
         * @static
         * @param {mars.TrailPoint.$Properties} message TrailPoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TrailPoint.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.lon != null && $Object.hasOwnProperty.call(message, "lon") && !$Object.is(message.lon, 0))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.lon);
            if (message.lat != null && $Object.hasOwnProperty.call(message, "lat") && !$Object.is(message.lat, 0))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.lat);
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol") && message.sol !== 0)
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.sol);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified TrailPoint message, length delimited. Does not implicitly {@link mars.TrailPoint.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.TrailPoint
         * @static
         * @param {mars.TrailPoint.$Properties} message TrailPoint message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TrailPoint.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a TrailPoint message from the specified reader or buffer.
         * @function decode
         * @memberof mars.TrailPoint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.TrailPoint & mars.TrailPoint.$Shape} TrailPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TrailPoint.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.TrailPoint();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.lon = value;
                        else
                            delete message.lon;
                        continue;
                    }
                case 2: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.lat = value;
                        else
                            delete message.lat;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.sol = value;
                        else
                            delete message.sol;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a TrailPoint message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.TrailPoint
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.TrailPoint & mars.TrailPoint.$Shape} TrailPoint
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TrailPoint.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TrailPoint message.
         * @function verify
         * @memberof mars.TrailPoint
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TrailPoint.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.lon != null && $Object.hasOwnProperty.call(message, "lon"))
                if (typeof message.lon !== "number")
                    return "lon: number expected";
            if (message.lat != null && $Object.hasOwnProperty.call(message, "lat"))
                if (typeof message.lat !== "number")
                    return "lat: number expected";
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol"))
                if (!$util.isInteger(message.sol))
                    return "sol: integer expected";
            return null;
        };

        /**
         * Creates a TrailPoint message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.TrailPoint
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.TrailPoint} TrailPoint
         */
        TrailPoint.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.TrailPoint)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.TrailPoint: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.TrailPoint();
            if (object.lon != null)
                if (!$Object.is($Number(object.lon), 0))
                    message.lon = $Number(object.lon);
            if (object.lat != null)
                if (!$Object.is($Number(object.lat), 0))
                    message.lat = $Number(object.lat);
            if (object.sol != null)
                if ($Number(object.sol) !== 0)
                    message.sol = object.sol | 0;
            return message;
        };

        /**
         * Creates a plain object from a TrailPoint message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.TrailPoint
         * @static
         * @param {mars.TrailPoint} message TrailPoint
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TrailPoint.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.lon = 0;
                object.lat = 0;
                object.sol = 0;
            }
            if (message.lon != null && $Object.hasOwnProperty.call(message, "lon"))
                object.lon = options.json && !$isFinite(message.lon) ? $String(message.lon) : message.lon;
            if (message.lat != null && $Object.hasOwnProperty.call(message, "lat"))
                object.lat = options.json && !$isFinite(message.lat) ? $String(message.lat) : message.lat;
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol"))
                object.sol = message.sol;
            return object;
        };

        /**
         * Converts this TrailPoint to JSON.
         * @function toJSON
         * @memberof mars.TrailPoint
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TrailPoint.prototype.toJSON = function() {
            return TrailPoint.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for TrailPoint
         * @function getTypeUrl
         * @memberof mars.TrailPoint
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        TrailPoint.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.TrailPoint";
        };

        return TrailPoint;
    })();

    mars.RoverData = (function() {

        /**
         * Properties of a RoverData.
         * @typedef {Object} mars.RoverData.$Properties
         * @property {string|null} [rover] RoverData rover
         * @property {string|null} [name] RoverData name
         * @property {string|null} [nameEn] RoverData nameEn
         * @property {number|null} [site] RoverData site
         * @property {number|null} [drive] RoverData drive
         * @property {number|null} [sol] RoverData sol
         * @property {mars.Coordinates.$Properties|null} [coordinates] RoverData coordinates
         * @property {mars.Distance.$Properties|null} [distance] RoverData distance
         * @property {mars.Attitude.$Properties|null} [attitude] RoverData attitude
         * @property {string|null} [locationName] RoverData locationName
         * @property {string|null} [note] RoverData note
         * @property {number|null} [waypointsCount] RoverData waypointsCount
         * @property {Array.<mars.TrailPoint.$Properties>|null} [recentTrail] RoverData recentTrail
         * @property {string|null} [updatedAt] RoverData updatedAt
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RoverData.
         * @memberof mars
         * @interface IRoverData
         * @augments mars.RoverData.$Properties
         * @deprecated Use mars.RoverData.$Properties instead.
         */

        /**
         * Shape of a RoverData.
         * @typedef {mars.RoverData.$Properties} mars.RoverData.$Shape
         */

        /**
         * Constructs a new RoverData.
         * @memberof mars
         * @classdesc Represents a RoverData.
         * @constructor
         * @param {mars.RoverData.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RoverData = function (properties) {
            this.recentTrail = [];
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RoverData rover.
         * @member {string} rover
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.rover = "";

        /**
         * RoverData name.
         * @member {string} name
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.name = "";

        /**
         * RoverData nameEn.
         * @member {string} nameEn
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.nameEn = "";

        /**
         * RoverData site.
         * @member {number} site
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.site = 0;

        /**
         * RoverData drive.
         * @member {number} drive
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.drive = 0;

        /**
         * RoverData sol.
         * @member {number} sol
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.sol = 0;

        /**
         * RoverData coordinates.
         * @member {mars.Coordinates.$Properties|null|undefined} coordinates
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.coordinates = null;

        /**
         * RoverData distance.
         * @member {mars.Distance.$Properties|null|undefined} distance
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.distance = null;

        /**
         * RoverData attitude.
         * @member {mars.Attitude.$Properties|null|undefined} attitude
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.attitude = null;

        /**
         * RoverData locationName.
         * @member {string} locationName
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.locationName = "";

        /**
         * RoverData note.
         * @member {string} note
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.note = "";

        /**
         * RoverData waypointsCount.
         * @member {number} waypointsCount
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.waypointsCount = 0;

        /**
         * RoverData recentTrail.
         * @member {Array.<mars.TrailPoint.$Properties>} recentTrail
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.recentTrail = $util.emptyArray;

        /**
         * RoverData updatedAt.
         * @member {string} updatedAt
         * @memberof mars.RoverData
         * @instance
         */
        RoverData.prototype.updatedAt = "";

        /**
         * Creates a new RoverData instance using the specified properties.
         * @function create
         * @memberof mars.RoverData
         * @static
         * @param {mars.RoverData.$Properties=} [properties] Properties to set
         * @returns {mars.RoverData} RoverData instance
         * @type {{
         *   (properties: mars.RoverData.$Shape): mars.RoverData & mars.RoverData.$Shape;
         *   (properties?: mars.RoverData.$Properties): mars.RoverData;
         * }}
         */
        RoverData.create = function(properties) {
            return new RoverData(properties);
        };

        /**
         * Encodes the specified RoverData message. Does not implicitly {@link mars.RoverData.verify|verify} messages.
         * @function encode
         * @memberof mars.RoverData
         * @static
         * @param {mars.RoverData.$Properties} message RoverData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoverData.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.rover != null && $Object.hasOwnProperty.call(message, "rover") && message.rover !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.rover);
            if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.nameEn != null && $Object.hasOwnProperty.call(message, "nameEn") && message.nameEn !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nameEn);
            if (message.site != null && $Object.hasOwnProperty.call(message, "site") && message.site !== 0)
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.site);
            if (message.drive != null && $Object.hasOwnProperty.call(message, "drive") && message.drive !== 0)
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.drive);
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol") && message.sol !== 0)
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.sol);
            if (message.coordinates != null && $Object.hasOwnProperty.call(message, "coordinates"))
                $root.mars.Coordinates.encode(message.coordinates, writer.uint32(/* id 7, wireType 2 =*/58).fork(), _depth + 1).ldelim();
            if (message.distance != null && $Object.hasOwnProperty.call(message, "distance"))
                $root.mars.Distance.encode(message.distance, writer.uint32(/* id 8, wireType 2 =*/66).fork(), _depth + 1).ldelim();
            if (message.attitude != null && $Object.hasOwnProperty.call(message, "attitude"))
                $root.mars.Attitude.encode(message.attitude, writer.uint32(/* id 9, wireType 2 =*/74).fork(), _depth + 1).ldelim();
            if (message.locationName != null && $Object.hasOwnProperty.call(message, "locationName") && message.locationName !== "")
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.locationName);
            if (message.note != null && $Object.hasOwnProperty.call(message, "note") && message.note !== "")
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.note);
            if (message.waypointsCount != null && $Object.hasOwnProperty.call(message, "waypointsCount") && message.waypointsCount !== 0)
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.waypointsCount);
            if (message.recentTrail != null && message.recentTrail.length)
                for (var i = 0; i < message.recentTrail.length; ++i)
                    $root.mars.TrailPoint.encode(message.recentTrail[i], writer.uint32(/* id 13, wireType 2 =*/106).fork(), _depth + 1).ldelim();
            if (message.updatedAt != null && $Object.hasOwnProperty.call(message, "updatedAt") && message.updatedAt !== "")
                writer.uint32(/* id 14, wireType 2 =*/114).string(message.updatedAt);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RoverData message, length delimited. Does not implicitly {@link mars.RoverData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.RoverData
         * @static
         * @param {mars.RoverData.$Properties} message RoverData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoverData.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RoverData message from the specified reader or buffer.
         * @function decode
         * @memberof mars.RoverData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.RoverData & mars.RoverData.$Shape} RoverData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoverData.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.RoverData();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.rover = value;
                        else
                            delete message.rover;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.name = value;
                        else
                            delete message.name;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.nameEn = value;
                        else
                            delete message.nameEn;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.site = value;
                        else
                            delete message.site;
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.drive = value;
                        else
                            delete message.drive;
                        continue;
                    }
                case 6: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.sol = value;
                        else
                            delete message.sol;
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        message.coordinates = $root.mars.Coordinates.decode(reader, reader.uint32(), $undefined, _depth + 1, message.coordinates);
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.distance = $root.mars.Distance.decode(reader, reader.uint32(), $undefined, _depth + 1, message.distance);
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        message.attitude = $root.mars.Attitude.decode(reader, reader.uint32(), $undefined, _depth + 1, message.attitude);
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.locationName = value;
                        else
                            delete message.locationName;
                        continue;
                    }
                case 11: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.note = value;
                        else
                            delete message.note;
                        continue;
                    }
                case 12: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.int32())
                            message.waypointsCount = value;
                        else
                            delete message.waypointsCount;
                        continue;
                    }
                case 13: {
                        if (wireType !== 2)
                            break;
                        if (!(message.recentTrail && message.recentTrail.length))
                            message.recentTrail = [];
                        message.recentTrail.push($root.mars.TrailPoint.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 14: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.updatedAt = value;
                        else
                            delete message.updatedAt;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RoverData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.RoverData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.RoverData & mars.RoverData.$Shape} RoverData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoverData.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoverData message.
         * @function verify
         * @memberof mars.RoverData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoverData.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.rover != null && $Object.hasOwnProperty.call(message, "rover"))
                if (!$util.isString(message.rover))
                    return "rover: string expected";
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.nameEn != null && $Object.hasOwnProperty.call(message, "nameEn"))
                if (!$util.isString(message.nameEn))
                    return "nameEn: string expected";
            if (message.site != null && $Object.hasOwnProperty.call(message, "site"))
                if (!$util.isInteger(message.site))
                    return "site: integer expected";
            if (message.drive != null && $Object.hasOwnProperty.call(message, "drive"))
                if (!$util.isInteger(message.drive))
                    return "drive: integer expected";
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol"))
                if (!$util.isInteger(message.sol))
                    return "sol: integer expected";
            if (message.coordinates != null && $Object.hasOwnProperty.call(message, "coordinates")) {
                var error = $root.mars.Coordinates.verify(message.coordinates, _depth + 1);
                if (error)
                    return "coordinates." + error;
            }
            if (message.distance != null && $Object.hasOwnProperty.call(message, "distance")) {
                var error = $root.mars.Distance.verify(message.distance, _depth + 1);
                if (error)
                    return "distance." + error;
            }
            if (message.attitude != null && $Object.hasOwnProperty.call(message, "attitude")) {
                var error = $root.mars.Attitude.verify(message.attitude, _depth + 1);
                if (error)
                    return "attitude." + error;
            }
            if (message.locationName != null && $Object.hasOwnProperty.call(message, "locationName"))
                if (!$util.isString(message.locationName))
                    return "locationName: string expected";
            if (message.note != null && $Object.hasOwnProperty.call(message, "note"))
                if (!$util.isString(message.note))
                    return "note: string expected";
            if (message.waypointsCount != null && $Object.hasOwnProperty.call(message, "waypointsCount"))
                if (!$util.isInteger(message.waypointsCount))
                    return "waypointsCount: integer expected";
            if (message.recentTrail != null && $Object.hasOwnProperty.call(message, "recentTrail")) {
                if (!$Array.isArray(message.recentTrail))
                    return "recentTrail: array expected";
                for (var i = 0; i < message.recentTrail.length; ++i) {
                    var error = $root.mars.TrailPoint.verify(message.recentTrail[i], _depth + 1);
                    if (error)
                        return "recentTrail." + error;
                }
            }
            if (message.updatedAt != null && $Object.hasOwnProperty.call(message, "updatedAt"))
                if (!$util.isString(message.updatedAt))
                    return "updatedAt: string expected";
            return null;
        };

        /**
         * Creates a RoverData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.RoverData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.RoverData} RoverData
         */
        RoverData.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.RoverData)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.RoverData: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.RoverData();
            if (object.rover != null)
                if (typeof object.rover !== "string" || object.rover.length)
                    message.rover = $String(object.rover);
            if (object.name != null)
                if (typeof object.name !== "string" || object.name.length)
                    message.name = $String(object.name);
            if (object.nameEn != null)
                if (typeof object.nameEn !== "string" || object.nameEn.length)
                    message.nameEn = $String(object.nameEn);
            if (object.site != null)
                if ($Number(object.site) !== 0)
                    message.site = object.site | 0;
            if (object.drive != null)
                if ($Number(object.drive) !== 0)
                    message.drive = object.drive | 0;
            if (object.sol != null)
                if ($Number(object.sol) !== 0)
                    message.sol = object.sol | 0;
            if (object.coordinates != null) {
                if (!$util.isObject(object.coordinates))
                    throw $TypeError(".mars.RoverData.coordinates: object expected");
                message.coordinates = $root.mars.Coordinates.fromObject(object.coordinates, _depth + 1);
            }
            if (object.distance != null) {
                if (!$util.isObject(object.distance))
                    throw $TypeError(".mars.RoverData.distance: object expected");
                message.distance = $root.mars.Distance.fromObject(object.distance, _depth + 1);
            }
            if (object.attitude != null) {
                if (!$util.isObject(object.attitude))
                    throw $TypeError(".mars.RoverData.attitude: object expected");
                message.attitude = $root.mars.Attitude.fromObject(object.attitude, _depth + 1);
            }
            if (object.locationName != null)
                if (typeof object.locationName !== "string" || object.locationName.length)
                    message.locationName = $String(object.locationName);
            if (object.note != null)
                if (typeof object.note !== "string" || object.note.length)
                    message.note = $String(object.note);
            if (object.waypointsCount != null)
                if ($Number(object.waypointsCount) !== 0)
                    message.waypointsCount = object.waypointsCount | 0;
            if (object.recentTrail) {
                if (!$Array.isArray(object.recentTrail))
                    throw $TypeError(".mars.RoverData.recentTrail: array expected");
                message.recentTrail = $Array(object.recentTrail.length);
                for (var i = 0; i < object.recentTrail.length; ++i) {
                    if (!$util.isObject(object.recentTrail[i]))
                        throw $TypeError(".mars.RoverData.recentTrail: object expected");
                    message.recentTrail[i] = $root.mars.TrailPoint.fromObject(object.recentTrail[i], _depth + 1);
                }
            }
            if (object.updatedAt != null)
                if (typeof object.updatedAt !== "string" || object.updatedAt.length)
                    message.updatedAt = $String(object.updatedAt);
            return message;
        };

        /**
         * Creates a plain object from a RoverData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.RoverData
         * @static
         * @param {mars.RoverData} message RoverData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoverData.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.arrays || options.defaults)
                object.recentTrail = [];
            if (options.defaults) {
                object.rover = "";
                object.name = "";
                object.nameEn = "";
                object.site = 0;
                object.drive = 0;
                object.sol = 0;
                object.coordinates = null;
                object.distance = null;
                object.attitude = null;
                object.locationName = "";
                object.note = "";
                object.waypointsCount = 0;
                object.updatedAt = "";
            }
            if (message.rover != null && $Object.hasOwnProperty.call(message, "rover"))
                object.rover = message.rover;
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.nameEn != null && $Object.hasOwnProperty.call(message, "nameEn"))
                object.nameEn = message.nameEn;
            if (message.site != null && $Object.hasOwnProperty.call(message, "site"))
                object.site = message.site;
            if (message.drive != null && $Object.hasOwnProperty.call(message, "drive"))
                object.drive = message.drive;
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol"))
                object.sol = message.sol;
            if (message.coordinates != null && $Object.hasOwnProperty.call(message, "coordinates"))
                object.coordinates = $root.mars.Coordinates.toObject(message.coordinates, options, _depth + 1);
            if (message.distance != null && $Object.hasOwnProperty.call(message, "distance"))
                object.distance = $root.mars.Distance.toObject(message.distance, options, _depth + 1);
            if (message.attitude != null && $Object.hasOwnProperty.call(message, "attitude"))
                object.attitude = $root.mars.Attitude.toObject(message.attitude, options, _depth + 1);
            if (message.locationName != null && $Object.hasOwnProperty.call(message, "locationName"))
                object.locationName = message.locationName;
            if (message.note != null && $Object.hasOwnProperty.call(message, "note"))
                object.note = message.note;
            if (message.waypointsCount != null && $Object.hasOwnProperty.call(message, "waypointsCount"))
                object.waypointsCount = message.waypointsCount;
            if (message.recentTrail && message.recentTrail.length) {
                object.recentTrail = $Array(message.recentTrail.length);
                for (var j = 0; j < message.recentTrail.length; ++j)
                    object.recentTrail[j] = $root.mars.TrailPoint.toObject(message.recentTrail[j], options, _depth + 1);
            }
            if (message.updatedAt != null && $Object.hasOwnProperty.call(message, "updatedAt"))
                object.updatedAt = message.updatedAt;
            return object;
        };

        /**
         * Converts this RoverData to JSON.
         * @function toJSON
         * @memberof mars.RoverData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoverData.prototype.toJSON = function() {
            return RoverData.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RoverData
         * @function getTypeUrl
         * @memberof mars.RoverData
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RoverData.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.RoverData";
        };

        return RoverData;
    })();

    mars.RoversMap = (function() {

        /**
         * Properties of a RoversMap.
         * @typedef {Object} mars.RoversMap.$Properties
         * @property {mars.RoverData.$Properties|null} [perseverance] RoversMap perseverance
         * @property {mars.RoverData.$Properties|null} [curiosity] RoversMap curiosity
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RoversMap.
         * @memberof mars
         * @interface IRoversMap
         * @augments mars.RoversMap.$Properties
         * @deprecated Use mars.RoversMap.$Properties instead.
         */

        /**
         * Shape of a RoversMap.
         * @typedef {mars.RoversMap.$Properties} mars.RoversMap.$Shape
         */

        /**
         * Constructs a new RoversMap.
         * @memberof mars
         * @classdesc Represents a RoversMap.
         * @constructor
         * @param {mars.RoversMap.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RoversMap = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RoversMap perseverance.
         * @member {mars.RoverData.$Properties|null|undefined} perseverance
         * @memberof mars.RoversMap
         * @instance
         */
        RoversMap.prototype.perseverance = null;

        /**
         * RoversMap curiosity.
         * @member {mars.RoverData.$Properties|null|undefined} curiosity
         * @memberof mars.RoversMap
         * @instance
         */
        RoversMap.prototype.curiosity = null;

        /**
         * Creates a new RoversMap instance using the specified properties.
         * @function create
         * @memberof mars.RoversMap
         * @static
         * @param {mars.RoversMap.$Properties=} [properties] Properties to set
         * @returns {mars.RoversMap} RoversMap instance
         * @type {{
         *   (properties: mars.RoversMap.$Shape): mars.RoversMap & mars.RoversMap.$Shape;
         *   (properties?: mars.RoversMap.$Properties): mars.RoversMap;
         * }}
         */
        RoversMap.create = function(properties) {
            return new RoversMap(properties);
        };

        /**
         * Encodes the specified RoversMap message. Does not implicitly {@link mars.RoversMap.verify|verify} messages.
         * @function encode
         * @memberof mars.RoversMap
         * @static
         * @param {mars.RoversMap.$Properties} message RoversMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoversMap.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.perseverance != null && $Object.hasOwnProperty.call(message, "perseverance"))
                $root.mars.RoverData.encode(message.perseverance, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.curiosity != null && $Object.hasOwnProperty.call(message, "curiosity"))
                $root.mars.RoverData.encode(message.curiosity, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RoversMap message, length delimited. Does not implicitly {@link mars.RoversMap.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.RoversMap
         * @static
         * @param {mars.RoversMap.$Properties} message RoversMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoversMap.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RoversMap message from the specified reader or buffer.
         * @function decode
         * @memberof mars.RoversMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.RoversMap & mars.RoversMap.$Shape} RoversMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoversMap.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.RoversMap();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.perseverance = $root.mars.RoverData.decode(reader, reader.uint32(), $undefined, _depth + 1, message.perseverance);
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.curiosity = $root.mars.RoverData.decode(reader, reader.uint32(), $undefined, _depth + 1, message.curiosity);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RoversMap message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.RoversMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.RoversMap & mars.RoversMap.$Shape} RoversMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoversMap.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoversMap message.
         * @function verify
         * @memberof mars.RoversMap
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoversMap.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.perseverance != null && $Object.hasOwnProperty.call(message, "perseverance")) {
                var error = $root.mars.RoverData.verify(message.perseverance, _depth + 1);
                if (error)
                    return "perseverance." + error;
            }
            if (message.curiosity != null && $Object.hasOwnProperty.call(message, "curiosity")) {
                var error = $root.mars.RoverData.verify(message.curiosity, _depth + 1);
                if (error)
                    return "curiosity." + error;
            }
            return null;
        };

        /**
         * Creates a RoversMap message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.RoversMap
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.RoversMap} RoversMap
         */
        RoversMap.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.RoversMap)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.RoversMap: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.RoversMap();
            if (object.perseverance != null) {
                if (!$util.isObject(object.perseverance))
                    throw $TypeError(".mars.RoversMap.perseverance: object expected");
                message.perseverance = $root.mars.RoverData.fromObject(object.perseverance, _depth + 1);
            }
            if (object.curiosity != null) {
                if (!$util.isObject(object.curiosity))
                    throw $TypeError(".mars.RoversMap.curiosity: object expected");
                message.curiosity = $root.mars.RoverData.fromObject(object.curiosity, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a RoversMap message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.RoversMap
         * @static
         * @param {mars.RoversMap} message RoversMap
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoversMap.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.perseverance = null;
                object.curiosity = null;
            }
            if (message.perseverance != null && $Object.hasOwnProperty.call(message, "perseverance"))
                object.perseverance = $root.mars.RoverData.toObject(message.perseverance, options, _depth + 1);
            if (message.curiosity != null && $Object.hasOwnProperty.call(message, "curiosity"))
                object.curiosity = $root.mars.RoverData.toObject(message.curiosity, options, _depth + 1);
            return object;
        };

        /**
         * Converts this RoversMap to JSON.
         * @function toJSON
         * @memberof mars.RoversMap
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoversMap.prototype.toJSON = function() {
            return RoversMap.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RoversMap
         * @function getTypeUrl
         * @memberof mars.RoversMap
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RoversMap.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.RoversMap";
        };

        return RoversMap;
    })();

    mars.RoverLocationResponse = (function() {

        /**
         * Properties of a RoverLocationResponse.
         * @typedef {Object} mars.RoverLocationResponse.$Properties
         * @property {string|null} [timestamp] RoverLocationResponse timestamp
         * @property {mars.RoversMap.$Properties|null} [rovers] RoverLocationResponse rovers
         * @property {boolean|null} [fallback] RoverLocationResponse fallback
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a RoverLocationResponse.
         * @memberof mars
         * @interface IRoverLocationResponse
         * @augments mars.RoverLocationResponse.$Properties
         * @deprecated Use mars.RoverLocationResponse.$Properties instead.
         */

        /**
         * Shape of a RoverLocationResponse.
         * @typedef {mars.RoverLocationResponse.$Properties} mars.RoverLocationResponse.$Shape
         */

        /**
         * Constructs a new RoverLocationResponse.
         * @memberof mars
         * @classdesc Represents a RoverLocationResponse.
         * @constructor
         * @param {mars.RoverLocationResponse.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var RoverLocationResponse = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * RoverLocationResponse timestamp.
         * @member {string} timestamp
         * @memberof mars.RoverLocationResponse
         * @instance
         */
        RoverLocationResponse.prototype.timestamp = "";

        /**
         * RoverLocationResponse rovers.
         * @member {mars.RoversMap.$Properties|null|undefined} rovers
         * @memberof mars.RoverLocationResponse
         * @instance
         */
        RoverLocationResponse.prototype.rovers = null;

        /**
         * RoverLocationResponse fallback.
         * @member {boolean} fallback
         * @memberof mars.RoverLocationResponse
         * @instance
         */
        RoverLocationResponse.prototype.fallback = false;

        /**
         * Creates a new RoverLocationResponse instance using the specified properties.
         * @function create
         * @memberof mars.RoverLocationResponse
         * @static
         * @param {mars.RoverLocationResponse.$Properties=} [properties] Properties to set
         * @returns {mars.RoverLocationResponse} RoverLocationResponse instance
         * @type {{
         *   (properties: mars.RoverLocationResponse.$Shape): mars.RoverLocationResponse & mars.RoverLocationResponse.$Shape;
         *   (properties?: mars.RoverLocationResponse.$Properties): mars.RoverLocationResponse;
         * }}
         */
        RoverLocationResponse.create = function(properties) {
            return new RoverLocationResponse(properties);
        };

        /**
         * Encodes the specified RoverLocationResponse message. Does not implicitly {@link mars.RoverLocationResponse.verify|verify} messages.
         * @function encode
         * @memberof mars.RoverLocationResponse
         * @static
         * @param {mars.RoverLocationResponse.$Properties} message RoverLocationResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoverLocationResponse.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp") && message.timestamp !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.timestamp);
            if (message.rovers != null && $Object.hasOwnProperty.call(message, "rovers"))
                $root.mars.RoversMap.encode(message.rovers, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.fallback != null && $Object.hasOwnProperty.call(message, "fallback") && message.fallback !== false)
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.fallback);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified RoverLocationResponse message, length delimited. Does not implicitly {@link mars.RoverLocationResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.RoverLocationResponse
         * @static
         * @param {mars.RoverLocationResponse.$Properties} message RoverLocationResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoverLocationResponse.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a RoverLocationResponse message from the specified reader or buffer.
         * @function decode
         * @memberof mars.RoverLocationResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.RoverLocationResponse & mars.RoverLocationResponse.$Shape} RoverLocationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoverLocationResponse.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.RoverLocationResponse();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.timestamp = value;
                        else
                            delete message.timestamp;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.rovers = $root.mars.RoversMap.decode(reader, reader.uint32(), $undefined, _depth + 1, message.rovers);
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.fallback = value;
                        else
                            delete message.fallback;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a RoverLocationResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.RoverLocationResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.RoverLocationResponse & mars.RoverLocationResponse.$Shape} RoverLocationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoverLocationResponse.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoverLocationResponse message.
         * @function verify
         * @memberof mars.RoverLocationResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoverLocationResponse.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp"))
                if (!$util.isString(message.timestamp))
                    return "timestamp: string expected";
            if (message.rovers != null && $Object.hasOwnProperty.call(message, "rovers")) {
                var error = $root.mars.RoversMap.verify(message.rovers, _depth + 1);
                if (error)
                    return "rovers." + error;
            }
            if (message.fallback != null && $Object.hasOwnProperty.call(message, "fallback"))
                if (typeof message.fallback !== "boolean")
                    return "fallback: boolean expected";
            return null;
        };

        /**
         * Creates a RoverLocationResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.RoverLocationResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.RoverLocationResponse} RoverLocationResponse
         */
        RoverLocationResponse.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.RoverLocationResponse)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.RoverLocationResponse: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.RoverLocationResponse();
            if (object.timestamp != null)
                if (typeof object.timestamp !== "string" || object.timestamp.length)
                    message.timestamp = $String(object.timestamp);
            if (object.rovers != null) {
                if (!$util.isObject(object.rovers))
                    throw $TypeError(".mars.RoverLocationResponse.rovers: object expected");
                message.rovers = $root.mars.RoversMap.fromObject(object.rovers, _depth + 1);
            }
            if (object.fallback != null)
                if (object.fallback)
                    message.fallback = $Boolean(object.fallback);
            return message;
        };

        /**
         * Creates a plain object from a RoverLocationResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.RoverLocationResponse
         * @static
         * @param {mars.RoverLocationResponse} message RoverLocationResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoverLocationResponse.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.timestamp = "";
                object.rovers = null;
                object.fallback = false;
            }
            if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp"))
                object.timestamp = message.timestamp;
            if (message.rovers != null && $Object.hasOwnProperty.call(message, "rovers"))
                object.rovers = $root.mars.RoversMap.toObject(message.rovers, options, _depth + 1);
            if (message.fallback != null && $Object.hasOwnProperty.call(message, "fallback"))
                object.fallback = message.fallback;
            return object;
        };

        /**
         * Converts this RoverLocationResponse to JSON.
         * @function toJSON
         * @memberof mars.RoverLocationResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoverLocationResponse.prototype.toJSON = function() {
            return RoverLocationResponse.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for RoverLocationResponse
         * @function getTypeUrl
         * @memberof mars.RoverLocationResponse
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        RoverLocationResponse.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.RoverLocationResponse";
        };

        return RoverLocationResponse;
    })();

    mars.Metric = (function() {

        /**
         * Properties of a Metric.
         * @typedef {Object} mars.Metric.$Properties
         * @property {number|null} [average] Metric average
         * @property {number|null} [min] Metric min
         * @property {number|null} [max] Metric max
         * @property {string|null} [unit] Metric unit
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a Metric.
         * @memberof mars
         * @interface IMetric
         * @augments mars.Metric.$Properties
         * @deprecated Use mars.Metric.$Properties instead.
         */

        /**
         * Shape of a Metric.
         * @typedef {mars.Metric.$Properties} mars.Metric.$Shape
         */

        /**
         * Constructs a new Metric.
         * @memberof mars
         * @classdesc Represents a Metric.
         * @constructor
         * @param {mars.Metric.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var Metric = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * Metric average.
         * @member {number} average
         * @memberof mars.Metric
         * @instance
         */
        Metric.prototype.average = 0;

        /**
         * Metric min.
         * @member {number} min
         * @memberof mars.Metric
         * @instance
         */
        Metric.prototype.min = 0;

        /**
         * Metric max.
         * @member {number} max
         * @memberof mars.Metric
         * @instance
         */
        Metric.prototype.max = 0;

        /**
         * Metric unit.
         * @member {string} unit
         * @memberof mars.Metric
         * @instance
         */
        Metric.prototype.unit = "";

        /**
         * Creates a new Metric instance using the specified properties.
         * @function create
         * @memberof mars.Metric
         * @static
         * @param {mars.Metric.$Properties=} [properties] Properties to set
         * @returns {mars.Metric} Metric instance
         * @type {{
         *   (properties: mars.Metric.$Shape): mars.Metric & mars.Metric.$Shape;
         *   (properties?: mars.Metric.$Properties): mars.Metric;
         * }}
         */
        Metric.create = function(properties) {
            return new Metric(properties);
        };

        /**
         * Encodes the specified Metric message. Does not implicitly {@link mars.Metric.verify|verify} messages.
         * @function encode
         * @memberof mars.Metric
         * @static
         * @param {mars.Metric.$Properties} message Metric message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Metric.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.average != null && $Object.hasOwnProperty.call(message, "average") && !$Object.is(message.average, 0))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.average);
            if (message.min != null && $Object.hasOwnProperty.call(message, "min") && !$Object.is(message.min, 0))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.min);
            if (message.max != null && $Object.hasOwnProperty.call(message, "max") && !$Object.is(message.max, 0))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.max);
            if (message.unit != null && $Object.hasOwnProperty.call(message, "unit") && message.unit !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.unit);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Metric message, length delimited. Does not implicitly {@link mars.Metric.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.Metric
         * @static
         * @param {mars.Metric.$Properties} message Metric message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Metric.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a Metric message from the specified reader or buffer.
         * @function decode
         * @memberof mars.Metric
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.Metric & mars.Metric.$Shape} Metric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Metric.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.Metric();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.average = value;
                        else
                            delete message.average;
                        continue;
                    }
                case 2: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.min = value;
                        else
                            delete message.min;
                        continue;
                    }
                case 3: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.max = value;
                        else
                            delete message.max;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.unit = value;
                        else
                            delete message.unit;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a Metric message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.Metric
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.Metric & mars.Metric.$Shape} Metric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Metric.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Metric message.
         * @function verify
         * @memberof mars.Metric
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Metric.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.average != null && $Object.hasOwnProperty.call(message, "average"))
                if (typeof message.average !== "number")
                    return "average: number expected";
            if (message.min != null && $Object.hasOwnProperty.call(message, "min"))
                if (typeof message.min !== "number")
                    return "min: number expected";
            if (message.max != null && $Object.hasOwnProperty.call(message, "max"))
                if (typeof message.max !== "number")
                    return "max: number expected";
            if (message.unit != null && $Object.hasOwnProperty.call(message, "unit"))
                if (!$util.isString(message.unit))
                    return "unit: string expected";
            return null;
        };

        /**
         * Creates a Metric message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.Metric
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.Metric} Metric
         */
        Metric.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.Metric)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.Metric: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.Metric();
            if (object.average != null)
                if (!$Object.is($Number(object.average), 0))
                    message.average = $Number(object.average);
            if (object.min != null)
                if (!$Object.is($Number(object.min), 0))
                    message.min = $Number(object.min);
            if (object.max != null)
                if (!$Object.is($Number(object.max), 0))
                    message.max = $Number(object.max);
            if (object.unit != null)
                if (typeof object.unit !== "string" || object.unit.length)
                    message.unit = $String(object.unit);
            return message;
        };

        /**
         * Creates a plain object from a Metric message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.Metric
         * @static
         * @param {mars.Metric} message Metric
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Metric.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.average = 0;
                object.min = 0;
                object.max = 0;
                object.unit = "";
            }
            if (message.average != null && $Object.hasOwnProperty.call(message, "average"))
                object.average = options.json && !$isFinite(message.average) ? $String(message.average) : message.average;
            if (message.min != null && $Object.hasOwnProperty.call(message, "min"))
                object.min = options.json && !$isFinite(message.min) ? $String(message.min) : message.min;
            if (message.max != null && $Object.hasOwnProperty.call(message, "max"))
                object.max = options.json && !$isFinite(message.max) ? $String(message.max) : message.max;
            if (message.unit != null && $Object.hasOwnProperty.call(message, "unit"))
                object.unit = message.unit;
            return object;
        };

        /**
         * Converts this Metric to JSON.
         * @function toJSON
         * @memberof mars.Metric
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Metric.prototype.toJSON = function() {
            return Metric.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Metric
         * @function getTypeUrl
         * @memberof mars.Metric
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Metric.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.Metric";
        };

        return Metric;
    })();

    mars.PressureMetric = (function() {

        /**
         * Properties of a PressureMetric.
         * @typedef {Object} mars.PressureMetric.$Properties
         * @property {number|null} [average] PressureMetric average
         * @property {number|null} [min] PressureMetric min
         * @property {number|null} [max] PressureMetric max
         * @property {string|null} [unit] PressureMetric unit
         * @property {string|null} [string] PressureMetric string
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a PressureMetric.
         * @memberof mars
         * @interface IPressureMetric
         * @augments mars.PressureMetric.$Properties
         * @deprecated Use mars.PressureMetric.$Properties instead.
         */

        /**
         * Shape of a PressureMetric.
         * @typedef {mars.PressureMetric.$Properties} mars.PressureMetric.$Shape
         */

        /**
         * Constructs a new PressureMetric.
         * @memberof mars
         * @classdesc Represents a PressureMetric.
         * @constructor
         * @param {mars.PressureMetric.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var PressureMetric = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * PressureMetric average.
         * @member {number} average
         * @memberof mars.PressureMetric
         * @instance
         */
        PressureMetric.prototype.average = 0;

        /**
         * PressureMetric min.
         * @member {number} min
         * @memberof mars.PressureMetric
         * @instance
         */
        PressureMetric.prototype.min = 0;

        /**
         * PressureMetric max.
         * @member {number} max
         * @memberof mars.PressureMetric
         * @instance
         */
        PressureMetric.prototype.max = 0;

        /**
         * PressureMetric unit.
         * @member {string} unit
         * @memberof mars.PressureMetric
         * @instance
         */
        PressureMetric.prototype.unit = "";

        /**
         * PressureMetric string.
         * @member {string} string
         * @memberof mars.PressureMetric
         * @instance
         */
        PressureMetric.prototype.string = "";

        /**
         * Creates a new PressureMetric instance using the specified properties.
         * @function create
         * @memberof mars.PressureMetric
         * @static
         * @param {mars.PressureMetric.$Properties=} [properties] Properties to set
         * @returns {mars.PressureMetric} PressureMetric instance
         * @type {{
         *   (properties: mars.PressureMetric.$Shape): mars.PressureMetric & mars.PressureMetric.$Shape;
         *   (properties?: mars.PressureMetric.$Properties): mars.PressureMetric;
         * }}
         */
        PressureMetric.create = function(properties) {
            return new PressureMetric(properties);
        };

        /**
         * Encodes the specified PressureMetric message. Does not implicitly {@link mars.PressureMetric.verify|verify} messages.
         * @function encode
         * @memberof mars.PressureMetric
         * @static
         * @param {mars.PressureMetric.$Properties} message PressureMetric message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PressureMetric.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.average != null && $Object.hasOwnProperty.call(message, "average") && !$Object.is(message.average, 0))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.average);
            if (message.min != null && $Object.hasOwnProperty.call(message, "min") && !$Object.is(message.min, 0))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.min);
            if (message.max != null && $Object.hasOwnProperty.call(message, "max") && !$Object.is(message.max, 0))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.max);
            if (message.unit != null && $Object.hasOwnProperty.call(message, "unit") && message.unit !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.unit);
            if (message.string != null && $Object.hasOwnProperty.call(message, "string") && message.string !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.string);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified PressureMetric message, length delimited. Does not implicitly {@link mars.PressureMetric.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.PressureMetric
         * @static
         * @param {mars.PressureMetric.$Properties} message PressureMetric message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PressureMetric.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a PressureMetric message from the specified reader or buffer.
         * @function decode
         * @memberof mars.PressureMetric
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.PressureMetric & mars.PressureMetric.$Shape} PressureMetric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PressureMetric.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.PressureMetric();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.average = value;
                        else
                            delete message.average;
                        continue;
                    }
                case 2: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.min = value;
                        else
                            delete message.min;
                        continue;
                    }
                case 3: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.max = value;
                        else
                            delete message.max;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.unit = value;
                        else
                            delete message.unit;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.string = value;
                        else
                            delete message.string;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a PressureMetric message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.PressureMetric
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.PressureMetric & mars.PressureMetric.$Shape} PressureMetric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PressureMetric.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PressureMetric message.
         * @function verify
         * @memberof mars.PressureMetric
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PressureMetric.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.average != null && $Object.hasOwnProperty.call(message, "average"))
                if (typeof message.average !== "number")
                    return "average: number expected";
            if (message.min != null && $Object.hasOwnProperty.call(message, "min"))
                if (typeof message.min !== "number")
                    return "min: number expected";
            if (message.max != null && $Object.hasOwnProperty.call(message, "max"))
                if (typeof message.max !== "number")
                    return "max: number expected";
            if (message.unit != null && $Object.hasOwnProperty.call(message, "unit"))
                if (!$util.isString(message.unit))
                    return "unit: string expected";
            if (message.string != null && $Object.hasOwnProperty.call(message, "string"))
                if (!$util.isString(message.string))
                    return "string: string expected";
            return null;
        };

        /**
         * Creates a PressureMetric message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.PressureMetric
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.PressureMetric} PressureMetric
         */
        PressureMetric.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.PressureMetric)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.PressureMetric: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.PressureMetric();
            if (object.average != null)
                if (!$Object.is($Number(object.average), 0))
                    message.average = $Number(object.average);
            if (object.min != null)
                if (!$Object.is($Number(object.min), 0))
                    message.min = $Number(object.min);
            if (object.max != null)
                if (!$Object.is($Number(object.max), 0))
                    message.max = $Number(object.max);
            if (object.unit != null)
                if (typeof object.unit !== "string" || object.unit.length)
                    message.unit = $String(object.unit);
            if (object.string != null)
                if (typeof object.string !== "string" || object.string.length)
                    message.string = $String(object.string);
            return message;
        };

        /**
         * Creates a plain object from a PressureMetric message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.PressureMetric
         * @static
         * @param {mars.PressureMetric} message PressureMetric
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PressureMetric.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.average = 0;
                object.min = 0;
                object.max = 0;
                object.unit = "";
                object.string = "";
            }
            if (message.average != null && $Object.hasOwnProperty.call(message, "average"))
                object.average = options.json && !$isFinite(message.average) ? $String(message.average) : message.average;
            if (message.min != null && $Object.hasOwnProperty.call(message, "min"))
                object.min = options.json && !$isFinite(message.min) ? $String(message.min) : message.min;
            if (message.max != null && $Object.hasOwnProperty.call(message, "max"))
                object.max = options.json && !$isFinite(message.max) ? $String(message.max) : message.max;
            if (message.unit != null && $Object.hasOwnProperty.call(message, "unit"))
                object.unit = message.unit;
            if (message.string != null && $Object.hasOwnProperty.call(message, "string"))
                object.string = message.string;
            return object;
        };

        /**
         * Converts this PressureMetric to JSON.
         * @function toJSON
         * @memberof mars.PressureMetric
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PressureMetric.prototype.toJSON = function() {
            return PressureMetric.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for PressureMetric
         * @function getTypeUrl
         * @memberof mars.PressureMetric
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        PressureMetric.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.PressureMetric";
        };

        return PressureMetric;
    })();

    mars.WindMetric = (function() {

        /**
         * Properties of a WindMetric.
         * @typedef {Object} mars.WindMetric.$Properties
         * @property {number|null} [average] WindMetric average
         * @property {number|null} [min] WindMetric min
         * @property {number|null} [max] WindMetric max
         * @property {string|null} [unit] WindMetric unit
         * @property {string|null} [mostCommonDirection] WindMetric mostCommonDirection
         * @property {number|null} [compassDegrees] WindMetric compassDegrees
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a WindMetric.
         * @memberof mars
         * @interface IWindMetric
         * @augments mars.WindMetric.$Properties
         * @deprecated Use mars.WindMetric.$Properties instead.
         */

        /**
         * Shape of a WindMetric.
         * @typedef {mars.WindMetric.$Properties} mars.WindMetric.$Shape
         */

        /**
         * Constructs a new WindMetric.
         * @memberof mars
         * @classdesc Represents a WindMetric.
         * @constructor
         * @param {mars.WindMetric.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var WindMetric = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * WindMetric average.
         * @member {number} average
         * @memberof mars.WindMetric
         * @instance
         */
        WindMetric.prototype.average = 0;

        /**
         * WindMetric min.
         * @member {number} min
         * @memberof mars.WindMetric
         * @instance
         */
        WindMetric.prototype.min = 0;

        /**
         * WindMetric max.
         * @member {number} max
         * @memberof mars.WindMetric
         * @instance
         */
        WindMetric.prototype.max = 0;

        /**
         * WindMetric unit.
         * @member {string} unit
         * @memberof mars.WindMetric
         * @instance
         */
        WindMetric.prototype.unit = "";

        /**
         * WindMetric mostCommonDirection.
         * @member {string} mostCommonDirection
         * @memberof mars.WindMetric
         * @instance
         */
        WindMetric.prototype.mostCommonDirection = "";

        /**
         * WindMetric compassDegrees.
         * @member {number} compassDegrees
         * @memberof mars.WindMetric
         * @instance
         */
        WindMetric.prototype.compassDegrees = 0;

        /**
         * Creates a new WindMetric instance using the specified properties.
         * @function create
         * @memberof mars.WindMetric
         * @static
         * @param {mars.WindMetric.$Properties=} [properties] Properties to set
         * @returns {mars.WindMetric} WindMetric instance
         * @type {{
         *   (properties: mars.WindMetric.$Shape): mars.WindMetric & mars.WindMetric.$Shape;
         *   (properties?: mars.WindMetric.$Properties): mars.WindMetric;
         * }}
         */
        WindMetric.create = function(properties) {
            return new WindMetric(properties);
        };

        /**
         * Encodes the specified WindMetric message. Does not implicitly {@link mars.WindMetric.verify|verify} messages.
         * @function encode
         * @memberof mars.WindMetric
         * @static
         * @param {mars.WindMetric.$Properties} message WindMetric message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WindMetric.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.average != null && $Object.hasOwnProperty.call(message, "average") && !$Object.is(message.average, 0))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.average);
            if (message.min != null && $Object.hasOwnProperty.call(message, "min") && !$Object.is(message.min, 0))
                writer.uint32(/* id 2, wireType 1 =*/17).double(message.min);
            if (message.max != null && $Object.hasOwnProperty.call(message, "max") && !$Object.is(message.max, 0))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.max);
            if (message.unit != null && $Object.hasOwnProperty.call(message, "unit") && message.unit !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.unit);
            if (message.mostCommonDirection != null && $Object.hasOwnProperty.call(message, "mostCommonDirection") && message.mostCommonDirection !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.mostCommonDirection);
            if (message.compassDegrees != null && $Object.hasOwnProperty.call(message, "compassDegrees") && !$Object.is(message.compassDegrees, 0))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.compassDegrees);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified WindMetric message, length delimited. Does not implicitly {@link mars.WindMetric.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.WindMetric
         * @static
         * @param {mars.WindMetric.$Properties} message WindMetric message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WindMetric.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a WindMetric message from the specified reader or buffer.
         * @function decode
         * @memberof mars.WindMetric
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.WindMetric & mars.WindMetric.$Shape} WindMetric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WindMetric.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.WindMetric();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.average = value;
                        else
                            delete message.average;
                        continue;
                    }
                case 2: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.min = value;
                        else
                            delete message.min;
                        continue;
                    }
                case 3: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.max = value;
                        else
                            delete message.max;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.unit = value;
                        else
                            delete message.unit;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.mostCommonDirection = value;
                        else
                            delete message.mostCommonDirection;
                        continue;
                    }
                case 6: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.compassDegrees = value;
                        else
                            delete message.compassDegrees;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a WindMetric message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.WindMetric
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.WindMetric & mars.WindMetric.$Shape} WindMetric
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WindMetric.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WindMetric message.
         * @function verify
         * @memberof mars.WindMetric
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WindMetric.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.average != null && $Object.hasOwnProperty.call(message, "average"))
                if (typeof message.average !== "number")
                    return "average: number expected";
            if (message.min != null && $Object.hasOwnProperty.call(message, "min"))
                if (typeof message.min !== "number")
                    return "min: number expected";
            if (message.max != null && $Object.hasOwnProperty.call(message, "max"))
                if (typeof message.max !== "number")
                    return "max: number expected";
            if (message.unit != null && $Object.hasOwnProperty.call(message, "unit"))
                if (!$util.isString(message.unit))
                    return "unit: string expected";
            if (message.mostCommonDirection != null && $Object.hasOwnProperty.call(message, "mostCommonDirection"))
                if (!$util.isString(message.mostCommonDirection))
                    return "mostCommonDirection: string expected";
            if (message.compassDegrees != null && $Object.hasOwnProperty.call(message, "compassDegrees"))
                if (typeof message.compassDegrees !== "number")
                    return "compassDegrees: number expected";
            return null;
        };

        /**
         * Creates a WindMetric message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.WindMetric
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.WindMetric} WindMetric
         */
        WindMetric.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.WindMetric)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.WindMetric: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.WindMetric();
            if (object.average != null)
                if (!$Object.is($Number(object.average), 0))
                    message.average = $Number(object.average);
            if (object.min != null)
                if (!$Object.is($Number(object.min), 0))
                    message.min = $Number(object.min);
            if (object.max != null)
                if (!$Object.is($Number(object.max), 0))
                    message.max = $Number(object.max);
            if (object.unit != null)
                if (typeof object.unit !== "string" || object.unit.length)
                    message.unit = $String(object.unit);
            if (object.mostCommonDirection != null)
                if (typeof object.mostCommonDirection !== "string" || object.mostCommonDirection.length)
                    message.mostCommonDirection = $String(object.mostCommonDirection);
            if (object.compassDegrees != null)
                if (!$Object.is($Number(object.compassDegrees), 0))
                    message.compassDegrees = $Number(object.compassDegrees);
            return message;
        };

        /**
         * Creates a plain object from a WindMetric message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.WindMetric
         * @static
         * @param {mars.WindMetric} message WindMetric
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WindMetric.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.average = 0;
                object.min = 0;
                object.max = 0;
                object.unit = "";
                object.mostCommonDirection = "";
                object.compassDegrees = 0;
            }
            if (message.average != null && $Object.hasOwnProperty.call(message, "average"))
                object.average = options.json && !$isFinite(message.average) ? $String(message.average) : message.average;
            if (message.min != null && $Object.hasOwnProperty.call(message, "min"))
                object.min = options.json && !$isFinite(message.min) ? $String(message.min) : message.min;
            if (message.max != null && $Object.hasOwnProperty.call(message, "max"))
                object.max = options.json && !$isFinite(message.max) ? $String(message.max) : message.max;
            if (message.unit != null && $Object.hasOwnProperty.call(message, "unit"))
                object.unit = message.unit;
            if (message.mostCommonDirection != null && $Object.hasOwnProperty.call(message, "mostCommonDirection"))
                object.mostCommonDirection = message.mostCommonDirection;
            if (message.compassDegrees != null && $Object.hasOwnProperty.call(message, "compassDegrees"))
                object.compassDegrees = options.json && !$isFinite(message.compassDegrees) ? $String(message.compassDegrees) : message.compassDegrees;
            return object;
        };

        /**
         * Converts this WindMetric to JSON.
         * @function toJSON
         * @memberof mars.WindMetric
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WindMetric.prototype.toJSON = function() {
            return WindMetric.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for WindMetric
         * @function getTypeUrl
         * @memberof mars.WindMetric
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        WindMetric.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.WindMetric";
        };

        return WindMetric;
    })();

    mars.LatestWeather = (function() {

        /**
         * Properties of a LatestWeather.
         * @typedef {Object} mars.LatestWeather.$Properties
         * @property {string|null} [sol] LatestWeather sol
         * @property {string|null} [terrestrialDate] LatestWeather terrestrialDate
         * @property {string|null} [season] LatestWeather season
         * @property {string|null} [northernSeason] LatestWeather northernSeason
         * @property {string|null} [southernSeason] LatestWeather southernSeason
         * @property {string|null} [ls] LatestWeather ls
         * @property {mars.Metric.$Properties|null} [temperature] LatestWeather temperature
         * @property {mars.Metric.$Properties|null} [groundTemperature] LatestWeather groundTemperature
         * @property {mars.PressureMetric.$Properties|null} [pressure] LatestWeather pressure
         * @property {mars.WindMetric.$Properties|null} [wind] LatestWeather wind
         * @property {string|null} [uvIndex] LatestWeather uvIndex
         * @property {string|null} [atmoOpacity] LatestWeather atmoOpacity
         * @property {string|null} [sunrise] LatestWeather sunrise
         * @property {string|null} [sunset] LatestWeather sunset
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a LatestWeather.
         * @memberof mars
         * @interface ILatestWeather
         * @augments mars.LatestWeather.$Properties
         * @deprecated Use mars.LatestWeather.$Properties instead.
         */

        /**
         * Shape of a LatestWeather.
         * @typedef {mars.LatestWeather.$Properties} mars.LatestWeather.$Shape
         */

        /**
         * Constructs a new LatestWeather.
         * @memberof mars
         * @classdesc Represents a LatestWeather.
         * @constructor
         * @param {mars.LatestWeather.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var LatestWeather = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * LatestWeather sol.
         * @member {string} sol
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.sol = "";

        /**
         * LatestWeather terrestrialDate.
         * @member {string} terrestrialDate
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.terrestrialDate = "";

        /**
         * LatestWeather season.
         * @member {string} season
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.season = "";

        /**
         * LatestWeather northernSeason.
         * @member {string} northernSeason
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.northernSeason = "";

        /**
         * LatestWeather southernSeason.
         * @member {string} southernSeason
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.southernSeason = "";

        /**
         * LatestWeather ls.
         * @member {string} ls
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.ls = "";

        /**
         * LatestWeather temperature.
         * @member {mars.Metric.$Properties|null|undefined} temperature
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.temperature = null;

        /**
         * LatestWeather groundTemperature.
         * @member {mars.Metric.$Properties|null|undefined} groundTemperature
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.groundTemperature = null;

        /**
         * LatestWeather pressure.
         * @member {mars.PressureMetric.$Properties|null|undefined} pressure
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.pressure = null;

        /**
         * LatestWeather wind.
         * @member {mars.WindMetric.$Properties|null|undefined} wind
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.wind = null;

        /**
         * LatestWeather uvIndex.
         * @member {string} uvIndex
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.uvIndex = "";

        /**
         * LatestWeather atmoOpacity.
         * @member {string} atmoOpacity
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.atmoOpacity = "";

        /**
         * LatestWeather sunrise.
         * @member {string} sunrise
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.sunrise = "";

        /**
         * LatestWeather sunset.
         * @member {string} sunset
         * @memberof mars.LatestWeather
         * @instance
         */
        LatestWeather.prototype.sunset = "";

        /**
         * Creates a new LatestWeather instance using the specified properties.
         * @function create
         * @memberof mars.LatestWeather
         * @static
         * @param {mars.LatestWeather.$Properties=} [properties] Properties to set
         * @returns {mars.LatestWeather} LatestWeather instance
         * @type {{
         *   (properties: mars.LatestWeather.$Shape): mars.LatestWeather & mars.LatestWeather.$Shape;
         *   (properties?: mars.LatestWeather.$Properties): mars.LatestWeather;
         * }}
         */
        LatestWeather.create = function(properties) {
            return new LatestWeather(properties);
        };

        /**
         * Encodes the specified LatestWeather message. Does not implicitly {@link mars.LatestWeather.verify|verify} messages.
         * @function encode
         * @memberof mars.LatestWeather
         * @static
         * @param {mars.LatestWeather.$Properties} message LatestWeather message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LatestWeather.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol") && message.sol !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sol);
            if (message.terrestrialDate != null && $Object.hasOwnProperty.call(message, "terrestrialDate") && message.terrestrialDate !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.terrestrialDate);
            if (message.season != null && $Object.hasOwnProperty.call(message, "season") && message.season !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.season);
            if (message.northernSeason != null && $Object.hasOwnProperty.call(message, "northernSeason") && message.northernSeason !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.northernSeason);
            if (message.southernSeason != null && $Object.hasOwnProperty.call(message, "southernSeason") && message.southernSeason !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.southernSeason);
            if (message.ls != null && $Object.hasOwnProperty.call(message, "ls") && message.ls !== "")
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.ls);
            if (message.temperature != null && $Object.hasOwnProperty.call(message, "temperature"))
                $root.mars.Metric.encode(message.temperature, writer.uint32(/* id 7, wireType 2 =*/58).fork(), _depth + 1).ldelim();
            if (message.groundTemperature != null && $Object.hasOwnProperty.call(message, "groundTemperature"))
                $root.mars.Metric.encode(message.groundTemperature, writer.uint32(/* id 8, wireType 2 =*/66).fork(), _depth + 1).ldelim();
            if (message.pressure != null && $Object.hasOwnProperty.call(message, "pressure"))
                $root.mars.PressureMetric.encode(message.pressure, writer.uint32(/* id 9, wireType 2 =*/74).fork(), _depth + 1).ldelim();
            if (message.wind != null && $Object.hasOwnProperty.call(message, "wind"))
                $root.mars.WindMetric.encode(message.wind, writer.uint32(/* id 10, wireType 2 =*/82).fork(), _depth + 1).ldelim();
            if (message.uvIndex != null && $Object.hasOwnProperty.call(message, "uvIndex") && message.uvIndex !== "")
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.uvIndex);
            if (message.atmoOpacity != null && $Object.hasOwnProperty.call(message, "atmoOpacity") && message.atmoOpacity !== "")
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.atmoOpacity);
            if (message.sunrise != null && $Object.hasOwnProperty.call(message, "sunrise") && message.sunrise !== "")
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.sunrise);
            if (message.sunset != null && $Object.hasOwnProperty.call(message, "sunset") && message.sunset !== "")
                writer.uint32(/* id 14, wireType 2 =*/114).string(message.sunset);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified LatestWeather message, length delimited. Does not implicitly {@link mars.LatestWeather.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.LatestWeather
         * @static
         * @param {mars.LatestWeather.$Properties} message LatestWeather message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LatestWeather.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a LatestWeather message from the specified reader or buffer.
         * @function decode
         * @memberof mars.LatestWeather
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.LatestWeather & mars.LatestWeather.$Shape} LatestWeather
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LatestWeather.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.LatestWeather();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.sol = value;
                        else
                            delete message.sol;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.terrestrialDate = value;
                        else
                            delete message.terrestrialDate;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.season = value;
                        else
                            delete message.season;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.northernSeason = value;
                        else
                            delete message.northernSeason;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.southernSeason = value;
                        else
                            delete message.southernSeason;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.ls = value;
                        else
                            delete message.ls;
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        message.temperature = $root.mars.Metric.decode(reader, reader.uint32(), $undefined, _depth + 1, message.temperature);
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.groundTemperature = $root.mars.Metric.decode(reader, reader.uint32(), $undefined, _depth + 1, message.groundTemperature);
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        message.pressure = $root.mars.PressureMetric.decode(reader, reader.uint32(), $undefined, _depth + 1, message.pressure);
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        message.wind = $root.mars.WindMetric.decode(reader, reader.uint32(), $undefined, _depth + 1, message.wind);
                        continue;
                    }
                case 11: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.uvIndex = value;
                        else
                            delete message.uvIndex;
                        continue;
                    }
                case 12: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.atmoOpacity = value;
                        else
                            delete message.atmoOpacity;
                        continue;
                    }
                case 13: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.sunrise = value;
                        else
                            delete message.sunrise;
                        continue;
                    }
                case 14: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.sunset = value;
                        else
                            delete message.sunset;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a LatestWeather message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.LatestWeather
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.LatestWeather & mars.LatestWeather.$Shape} LatestWeather
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LatestWeather.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LatestWeather message.
         * @function verify
         * @memberof mars.LatestWeather
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LatestWeather.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol"))
                if (!$util.isString(message.sol))
                    return "sol: string expected";
            if (message.terrestrialDate != null && $Object.hasOwnProperty.call(message, "terrestrialDate"))
                if (!$util.isString(message.terrestrialDate))
                    return "terrestrialDate: string expected";
            if (message.season != null && $Object.hasOwnProperty.call(message, "season"))
                if (!$util.isString(message.season))
                    return "season: string expected";
            if (message.northernSeason != null && $Object.hasOwnProperty.call(message, "northernSeason"))
                if (!$util.isString(message.northernSeason))
                    return "northernSeason: string expected";
            if (message.southernSeason != null && $Object.hasOwnProperty.call(message, "southernSeason"))
                if (!$util.isString(message.southernSeason))
                    return "southernSeason: string expected";
            if (message.ls != null && $Object.hasOwnProperty.call(message, "ls"))
                if (!$util.isString(message.ls))
                    return "ls: string expected";
            if (message.temperature != null && $Object.hasOwnProperty.call(message, "temperature")) {
                var error = $root.mars.Metric.verify(message.temperature, _depth + 1);
                if (error)
                    return "temperature." + error;
            }
            if (message.groundTemperature != null && $Object.hasOwnProperty.call(message, "groundTemperature")) {
                var error = $root.mars.Metric.verify(message.groundTemperature, _depth + 1);
                if (error)
                    return "groundTemperature." + error;
            }
            if (message.pressure != null && $Object.hasOwnProperty.call(message, "pressure")) {
                var error = $root.mars.PressureMetric.verify(message.pressure, _depth + 1);
                if (error)
                    return "pressure." + error;
            }
            if (message.wind != null && $Object.hasOwnProperty.call(message, "wind")) {
                var error = $root.mars.WindMetric.verify(message.wind, _depth + 1);
                if (error)
                    return "wind." + error;
            }
            if (message.uvIndex != null && $Object.hasOwnProperty.call(message, "uvIndex"))
                if (!$util.isString(message.uvIndex))
                    return "uvIndex: string expected";
            if (message.atmoOpacity != null && $Object.hasOwnProperty.call(message, "atmoOpacity"))
                if (!$util.isString(message.atmoOpacity))
                    return "atmoOpacity: string expected";
            if (message.sunrise != null && $Object.hasOwnProperty.call(message, "sunrise"))
                if (!$util.isString(message.sunrise))
                    return "sunrise: string expected";
            if (message.sunset != null && $Object.hasOwnProperty.call(message, "sunset"))
                if (!$util.isString(message.sunset))
                    return "sunset: string expected";
            return null;
        };

        /**
         * Creates a LatestWeather message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.LatestWeather
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.LatestWeather} LatestWeather
         */
        LatestWeather.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.LatestWeather)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.LatestWeather: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.LatestWeather();
            if (object.sol != null)
                if (typeof object.sol !== "string" || object.sol.length)
                    message.sol = $String(object.sol);
            if (object.terrestrialDate != null)
                if (typeof object.terrestrialDate !== "string" || object.terrestrialDate.length)
                    message.terrestrialDate = $String(object.terrestrialDate);
            if (object.season != null)
                if (typeof object.season !== "string" || object.season.length)
                    message.season = $String(object.season);
            if (object.northernSeason != null)
                if (typeof object.northernSeason !== "string" || object.northernSeason.length)
                    message.northernSeason = $String(object.northernSeason);
            if (object.southernSeason != null)
                if (typeof object.southernSeason !== "string" || object.southernSeason.length)
                    message.southernSeason = $String(object.southernSeason);
            if (object.ls != null)
                if (typeof object.ls !== "string" || object.ls.length)
                    message.ls = $String(object.ls);
            if (object.temperature != null) {
                if (!$util.isObject(object.temperature))
                    throw $TypeError(".mars.LatestWeather.temperature: object expected");
                message.temperature = $root.mars.Metric.fromObject(object.temperature, _depth + 1);
            }
            if (object.groundTemperature != null) {
                if (!$util.isObject(object.groundTemperature))
                    throw $TypeError(".mars.LatestWeather.groundTemperature: object expected");
                message.groundTemperature = $root.mars.Metric.fromObject(object.groundTemperature, _depth + 1);
            }
            if (object.pressure != null) {
                if (!$util.isObject(object.pressure))
                    throw $TypeError(".mars.LatestWeather.pressure: object expected");
                message.pressure = $root.mars.PressureMetric.fromObject(object.pressure, _depth + 1);
            }
            if (object.wind != null) {
                if (!$util.isObject(object.wind))
                    throw $TypeError(".mars.LatestWeather.wind: object expected");
                message.wind = $root.mars.WindMetric.fromObject(object.wind, _depth + 1);
            }
            if (object.uvIndex != null)
                if (typeof object.uvIndex !== "string" || object.uvIndex.length)
                    message.uvIndex = $String(object.uvIndex);
            if (object.atmoOpacity != null)
                if (typeof object.atmoOpacity !== "string" || object.atmoOpacity.length)
                    message.atmoOpacity = $String(object.atmoOpacity);
            if (object.sunrise != null)
                if (typeof object.sunrise !== "string" || object.sunrise.length)
                    message.sunrise = $String(object.sunrise);
            if (object.sunset != null)
                if (typeof object.sunset !== "string" || object.sunset.length)
                    message.sunset = $String(object.sunset);
            return message;
        };

        /**
         * Creates a plain object from a LatestWeather message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.LatestWeather
         * @static
         * @param {mars.LatestWeather} message LatestWeather
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LatestWeather.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.sol = "";
                object.terrestrialDate = "";
                object.season = "";
                object.northernSeason = "";
                object.southernSeason = "";
                object.ls = "";
                object.temperature = null;
                object.groundTemperature = null;
                object.pressure = null;
                object.wind = null;
                object.uvIndex = "";
                object.atmoOpacity = "";
                object.sunrise = "";
                object.sunset = "";
            }
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol"))
                object.sol = message.sol;
            if (message.terrestrialDate != null && $Object.hasOwnProperty.call(message, "terrestrialDate"))
                object.terrestrialDate = message.terrestrialDate;
            if (message.season != null && $Object.hasOwnProperty.call(message, "season"))
                object.season = message.season;
            if (message.northernSeason != null && $Object.hasOwnProperty.call(message, "northernSeason"))
                object.northernSeason = message.northernSeason;
            if (message.southernSeason != null && $Object.hasOwnProperty.call(message, "southernSeason"))
                object.southernSeason = message.southernSeason;
            if (message.ls != null && $Object.hasOwnProperty.call(message, "ls"))
                object.ls = message.ls;
            if (message.temperature != null && $Object.hasOwnProperty.call(message, "temperature"))
                object.temperature = $root.mars.Metric.toObject(message.temperature, options, _depth + 1);
            if (message.groundTemperature != null && $Object.hasOwnProperty.call(message, "groundTemperature"))
                object.groundTemperature = $root.mars.Metric.toObject(message.groundTemperature, options, _depth + 1);
            if (message.pressure != null && $Object.hasOwnProperty.call(message, "pressure"))
                object.pressure = $root.mars.PressureMetric.toObject(message.pressure, options, _depth + 1);
            if (message.wind != null && $Object.hasOwnProperty.call(message, "wind"))
                object.wind = $root.mars.WindMetric.toObject(message.wind, options, _depth + 1);
            if (message.uvIndex != null && $Object.hasOwnProperty.call(message, "uvIndex"))
                object.uvIndex = message.uvIndex;
            if (message.atmoOpacity != null && $Object.hasOwnProperty.call(message, "atmoOpacity"))
                object.atmoOpacity = message.atmoOpacity;
            if (message.sunrise != null && $Object.hasOwnProperty.call(message, "sunrise"))
                object.sunrise = message.sunrise;
            if (message.sunset != null && $Object.hasOwnProperty.call(message, "sunset"))
                object.sunset = message.sunset;
            return object;
        };

        /**
         * Converts this LatestWeather to JSON.
         * @function toJSON
         * @memberof mars.LatestWeather
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LatestWeather.prototype.toJSON = function() {
            return LatestWeather.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for LatestWeather
         * @function getTypeUrl
         * @memberof mars.LatestWeather
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        LatestWeather.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.LatestWeather";
        };

        return LatestWeather;
    })();

    mars.WeatherHistory = (function() {

        /**
         * Properties of a WeatherHistory.
         * @typedef {Object} mars.WeatherHistory.$Properties
         * @property {string|null} [sol] WeatherHistory sol
         * @property {string|null} [date] WeatherHistory date
         * @property {number|null} [minTemp] WeatherHistory minTemp
         * @property {number|null} [maxTemp] WeatherHistory maxTemp
         * @property {number|null} [minGts] WeatherHistory minGts
         * @property {number|null} [maxGts] WeatherHistory maxGts
         * @property {number|null} [pressure] WeatherHistory pressure
         * @property {string|null} [uv] WeatherHistory uv
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a WeatherHistory.
         * @memberof mars
         * @interface IWeatherHistory
         * @augments mars.WeatherHistory.$Properties
         * @deprecated Use mars.WeatherHistory.$Properties instead.
         */

        /**
         * Shape of a WeatherHistory.
         * @typedef {mars.WeatherHistory.$Properties} mars.WeatherHistory.$Shape
         */

        /**
         * Constructs a new WeatherHistory.
         * @memberof mars
         * @classdesc Represents a WeatherHistory.
         * @constructor
         * @param {mars.WeatherHistory.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var WeatherHistory = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * WeatherHistory sol.
         * @member {string} sol
         * @memberof mars.WeatherHistory
         * @instance
         */
        WeatherHistory.prototype.sol = "";

        /**
         * WeatherHistory date.
         * @member {string} date
         * @memberof mars.WeatherHistory
         * @instance
         */
        WeatherHistory.prototype.date = "";

        /**
         * WeatherHistory minTemp.
         * @member {number} minTemp
         * @memberof mars.WeatherHistory
         * @instance
         */
        WeatherHistory.prototype.minTemp = 0;

        /**
         * WeatherHistory maxTemp.
         * @member {number} maxTemp
         * @memberof mars.WeatherHistory
         * @instance
         */
        WeatherHistory.prototype.maxTemp = 0;

        /**
         * WeatherHistory minGts.
         * @member {number} minGts
         * @memberof mars.WeatherHistory
         * @instance
         */
        WeatherHistory.prototype.minGts = 0;

        /**
         * WeatherHistory maxGts.
         * @member {number} maxGts
         * @memberof mars.WeatherHistory
         * @instance
         */
        WeatherHistory.prototype.maxGts = 0;

        /**
         * WeatherHistory pressure.
         * @member {number} pressure
         * @memberof mars.WeatherHistory
         * @instance
         */
        WeatherHistory.prototype.pressure = 0;

        /**
         * WeatherHistory uv.
         * @member {string} uv
         * @memberof mars.WeatherHistory
         * @instance
         */
        WeatherHistory.prototype.uv = "";

        /**
         * Creates a new WeatherHistory instance using the specified properties.
         * @function create
         * @memberof mars.WeatherHistory
         * @static
         * @param {mars.WeatherHistory.$Properties=} [properties] Properties to set
         * @returns {mars.WeatherHistory} WeatherHistory instance
         * @type {{
         *   (properties: mars.WeatherHistory.$Shape): mars.WeatherHistory & mars.WeatherHistory.$Shape;
         *   (properties?: mars.WeatherHistory.$Properties): mars.WeatherHistory;
         * }}
         */
        WeatherHistory.create = function(properties) {
            return new WeatherHistory(properties);
        };

        /**
         * Encodes the specified WeatherHistory message. Does not implicitly {@link mars.WeatherHistory.verify|verify} messages.
         * @function encode
         * @memberof mars.WeatherHistory
         * @static
         * @param {mars.WeatherHistory.$Properties} message WeatherHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WeatherHistory.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol") && message.sol !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sol);
            if (message.date != null && $Object.hasOwnProperty.call(message, "date") && message.date !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.date);
            if (message.minTemp != null && $Object.hasOwnProperty.call(message, "minTemp") && !$Object.is(message.minTemp, 0))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.minTemp);
            if (message.maxTemp != null && $Object.hasOwnProperty.call(message, "maxTemp") && !$Object.is(message.maxTemp, 0))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.maxTemp);
            if (message.minGts != null && $Object.hasOwnProperty.call(message, "minGts") && !$Object.is(message.minGts, 0))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.minGts);
            if (message.maxGts != null && $Object.hasOwnProperty.call(message, "maxGts") && !$Object.is(message.maxGts, 0))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.maxGts);
            if (message.pressure != null && $Object.hasOwnProperty.call(message, "pressure") && !$Object.is(message.pressure, 0))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.pressure);
            if (message.uv != null && $Object.hasOwnProperty.call(message, "uv") && message.uv !== "")
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.uv);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified WeatherHistory message, length delimited. Does not implicitly {@link mars.WeatherHistory.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.WeatherHistory
         * @static
         * @param {mars.WeatherHistory.$Properties} message WeatherHistory message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WeatherHistory.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a WeatherHistory message from the specified reader or buffer.
         * @function decode
         * @memberof mars.WeatherHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.WeatherHistory & mars.WeatherHistory.$Shape} WeatherHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WeatherHistory.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.WeatherHistory();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.sol = value;
                        else
                            delete message.sol;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.date = value;
                        else
                            delete message.date;
                        continue;
                    }
                case 3: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.minTemp = value;
                        else
                            delete message.minTemp;
                        continue;
                    }
                case 4: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.maxTemp = value;
                        else
                            delete message.maxTemp;
                        continue;
                    }
                case 5: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.minGts = value;
                        else
                            delete message.minGts;
                        continue;
                    }
                case 6: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.maxGts = value;
                        else
                            delete message.maxGts;
                        continue;
                    }
                case 7: {
                        if (wireType !== 1)
                            break;
                        if (!$Object.is(value = reader.double(), 0))
                            message.pressure = value;
                        else
                            delete message.pressure;
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.uv = value;
                        else
                            delete message.uv;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a WeatherHistory message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.WeatherHistory
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.WeatherHistory & mars.WeatherHistory.$Shape} WeatherHistory
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WeatherHistory.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WeatherHistory message.
         * @function verify
         * @memberof mars.WeatherHistory
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WeatherHistory.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol"))
                if (!$util.isString(message.sol))
                    return "sol: string expected";
            if (message.date != null && $Object.hasOwnProperty.call(message, "date"))
                if (!$util.isString(message.date))
                    return "date: string expected";
            if (message.minTemp != null && $Object.hasOwnProperty.call(message, "minTemp"))
                if (typeof message.minTemp !== "number")
                    return "minTemp: number expected";
            if (message.maxTemp != null && $Object.hasOwnProperty.call(message, "maxTemp"))
                if (typeof message.maxTemp !== "number")
                    return "maxTemp: number expected";
            if (message.minGts != null && $Object.hasOwnProperty.call(message, "minGts"))
                if (typeof message.minGts !== "number")
                    return "minGts: number expected";
            if (message.maxGts != null && $Object.hasOwnProperty.call(message, "maxGts"))
                if (typeof message.maxGts !== "number")
                    return "maxGts: number expected";
            if (message.pressure != null && $Object.hasOwnProperty.call(message, "pressure"))
                if (typeof message.pressure !== "number")
                    return "pressure: number expected";
            if (message.uv != null && $Object.hasOwnProperty.call(message, "uv"))
                if (!$util.isString(message.uv))
                    return "uv: string expected";
            return null;
        };

        /**
         * Creates a WeatherHistory message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.WeatherHistory
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.WeatherHistory} WeatherHistory
         */
        WeatherHistory.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.WeatherHistory)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.WeatherHistory: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.WeatherHistory();
            if (object.sol != null)
                if (typeof object.sol !== "string" || object.sol.length)
                    message.sol = $String(object.sol);
            if (object.date != null)
                if (typeof object.date !== "string" || object.date.length)
                    message.date = $String(object.date);
            if (object.minTemp != null)
                if (!$Object.is($Number(object.minTemp), 0))
                    message.minTemp = $Number(object.minTemp);
            if (object.maxTemp != null)
                if (!$Object.is($Number(object.maxTemp), 0))
                    message.maxTemp = $Number(object.maxTemp);
            if (object.minGts != null)
                if (!$Object.is($Number(object.minGts), 0))
                    message.minGts = $Number(object.minGts);
            if (object.maxGts != null)
                if (!$Object.is($Number(object.maxGts), 0))
                    message.maxGts = $Number(object.maxGts);
            if (object.pressure != null)
                if (!$Object.is($Number(object.pressure), 0))
                    message.pressure = $Number(object.pressure);
            if (object.uv != null)
                if (typeof object.uv !== "string" || object.uv.length)
                    message.uv = $String(object.uv);
            return message;
        };

        /**
         * Creates a plain object from a WeatherHistory message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.WeatherHistory
         * @static
         * @param {mars.WeatherHistory} message WeatherHistory
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WeatherHistory.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.sol = "";
                object.date = "";
                object.minTemp = 0;
                object.maxTemp = 0;
                object.minGts = 0;
                object.maxGts = 0;
                object.pressure = 0;
                object.uv = "";
            }
            if (message.sol != null && $Object.hasOwnProperty.call(message, "sol"))
                object.sol = message.sol;
            if (message.date != null && $Object.hasOwnProperty.call(message, "date"))
                object.date = message.date;
            if (message.minTemp != null && $Object.hasOwnProperty.call(message, "minTemp"))
                object.minTemp = options.json && !$isFinite(message.minTemp) ? $String(message.minTemp) : message.minTemp;
            if (message.maxTemp != null && $Object.hasOwnProperty.call(message, "maxTemp"))
                object.maxTemp = options.json && !$isFinite(message.maxTemp) ? $String(message.maxTemp) : message.maxTemp;
            if (message.minGts != null && $Object.hasOwnProperty.call(message, "minGts"))
                object.minGts = options.json && !$isFinite(message.minGts) ? $String(message.minGts) : message.minGts;
            if (message.maxGts != null && $Object.hasOwnProperty.call(message, "maxGts"))
                object.maxGts = options.json && !$isFinite(message.maxGts) ? $String(message.maxGts) : message.maxGts;
            if (message.pressure != null && $Object.hasOwnProperty.call(message, "pressure"))
                object.pressure = options.json && !$isFinite(message.pressure) ? $String(message.pressure) : message.pressure;
            if (message.uv != null && $Object.hasOwnProperty.call(message, "uv"))
                object.uv = message.uv;
            return object;
        };

        /**
         * Converts this WeatherHistory to JSON.
         * @function toJSON
         * @memberof mars.WeatherHistory
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WeatherHistory.prototype.toJSON = function() {
            return WeatherHistory.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for WeatherHistory
         * @function getTypeUrl
         * @memberof mars.WeatherHistory
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        WeatherHistory.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.WeatherHistory";
        };

        return WeatherHistory;
    })();

    mars.StationData = (function() {

        /**
         * Properties of a StationData.
         * @typedef {Object} mars.StationData.$Properties
         * @property {string|null} [station] StationData station
         * @property {string|null} [rover] StationData rover
         * @property {string|null} [name] StationData name
         * @property {string|null} [nameEn] StationData nameEn
         * @property {string|null} [status] StationData status
         * @property {string|null} [instrument] StationData instrument
         * @property {string|null} [location] StationData location
         * @property {string|null} [note] StationData note
         * @property {mars.LatestWeather.$Properties|null} [latest] StationData latest
         * @property {Array.<mars.WeatherHistory.$Properties>|null} [history] StationData history
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a StationData.
         * @memberof mars
         * @interface IStationData
         * @augments mars.StationData.$Properties
         * @deprecated Use mars.StationData.$Properties instead.
         */

        /**
         * Shape of a StationData.
         * @typedef {mars.StationData.$Properties} mars.StationData.$Shape
         */

        /**
         * Constructs a new StationData.
         * @memberof mars
         * @classdesc Represents a StationData.
         * @constructor
         * @param {mars.StationData.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var StationData = function (properties) {
            this.history = [];
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * StationData station.
         * @member {string} station
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.station = "";

        /**
         * StationData rover.
         * @member {string} rover
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.rover = "";

        /**
         * StationData name.
         * @member {string} name
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.name = "";

        /**
         * StationData nameEn.
         * @member {string} nameEn
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.nameEn = "";

        /**
         * StationData status.
         * @member {string} status
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.status = "";

        /**
         * StationData instrument.
         * @member {string} instrument
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.instrument = "";

        /**
         * StationData location.
         * @member {string} location
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.location = "";

        /**
         * StationData note.
         * @member {string} note
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.note = "";

        /**
         * StationData latest.
         * @member {mars.LatestWeather.$Properties|null|undefined} latest
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.latest = null;

        /**
         * StationData history.
         * @member {Array.<mars.WeatherHistory.$Properties>} history
         * @memberof mars.StationData
         * @instance
         */
        StationData.prototype.history = $util.emptyArray;

        /**
         * Creates a new StationData instance using the specified properties.
         * @function create
         * @memberof mars.StationData
         * @static
         * @param {mars.StationData.$Properties=} [properties] Properties to set
         * @returns {mars.StationData} StationData instance
         * @type {{
         *   (properties: mars.StationData.$Shape): mars.StationData & mars.StationData.$Shape;
         *   (properties?: mars.StationData.$Properties): mars.StationData;
         * }}
         */
        StationData.create = function(properties) {
            return new StationData(properties);
        };

        /**
         * Encodes the specified StationData message. Does not implicitly {@link mars.StationData.verify|verify} messages.
         * @function encode
         * @memberof mars.StationData
         * @static
         * @param {mars.StationData.$Properties} message StationData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StationData.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.station != null && $Object.hasOwnProperty.call(message, "station") && message.station !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.station);
            if (message.rover != null && $Object.hasOwnProperty.call(message, "rover") && message.rover !== "")
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.rover);
            if (message.name != null && $Object.hasOwnProperty.call(message, "name") && message.name !== "")
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.nameEn != null && $Object.hasOwnProperty.call(message, "nameEn") && message.nameEn !== "")
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.nameEn);
            if (message.status != null && $Object.hasOwnProperty.call(message, "status") && message.status !== "")
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.status);
            if (message.instrument != null && $Object.hasOwnProperty.call(message, "instrument") && message.instrument !== "")
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.instrument);
            if (message.location != null && $Object.hasOwnProperty.call(message, "location") && message.location !== "")
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.location);
            if (message.note != null && $Object.hasOwnProperty.call(message, "note") && message.note !== "")
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.note);
            if (message.latest != null && $Object.hasOwnProperty.call(message, "latest"))
                $root.mars.LatestWeather.encode(message.latest, writer.uint32(/* id 9, wireType 2 =*/74).fork(), _depth + 1).ldelim();
            if (message.history != null && message.history.length)
                for (var i = 0; i < message.history.length; ++i)
                    $root.mars.WeatherHistory.encode(message.history[i], writer.uint32(/* id 10, wireType 2 =*/82).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified StationData message, length delimited. Does not implicitly {@link mars.StationData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.StationData
         * @static
         * @param {mars.StationData.$Properties} message StationData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StationData.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a StationData message from the specified reader or buffer.
         * @function decode
         * @memberof mars.StationData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.StationData & mars.StationData.$Shape} StationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StationData.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.StationData();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.station = value;
                        else
                            delete message.station;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.rover = value;
                        else
                            delete message.rover;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.name = value;
                        else
                            delete message.name;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.nameEn = value;
                        else
                            delete message.nameEn;
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.status = value;
                        else
                            delete message.status;
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.instrument = value;
                        else
                            delete message.instrument;
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.location = value;
                        else
                            delete message.location;
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.note = value;
                        else
                            delete message.note;
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        message.latest = $root.mars.LatestWeather.decode(reader, reader.uint32(), $undefined, _depth + 1, message.latest);
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        if (!(message.history && message.history.length))
                            message.history = [];
                        message.history.push($root.mars.WeatherHistory.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a StationData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.StationData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.StationData & mars.StationData.$Shape} StationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StationData.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StationData message.
         * @function verify
         * @memberof mars.StationData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StationData.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.station != null && $Object.hasOwnProperty.call(message, "station"))
                if (!$util.isString(message.station))
                    return "station: string expected";
            if (message.rover != null && $Object.hasOwnProperty.call(message, "rover"))
                if (!$util.isString(message.rover))
                    return "rover: string expected";
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.nameEn != null && $Object.hasOwnProperty.call(message, "nameEn"))
                if (!$util.isString(message.nameEn))
                    return "nameEn: string expected";
            if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
                if (!$util.isString(message.status))
                    return "status: string expected";
            if (message.instrument != null && $Object.hasOwnProperty.call(message, "instrument"))
                if (!$util.isString(message.instrument))
                    return "instrument: string expected";
            if (message.location != null && $Object.hasOwnProperty.call(message, "location"))
                if (!$util.isString(message.location))
                    return "location: string expected";
            if (message.note != null && $Object.hasOwnProperty.call(message, "note"))
                if (!$util.isString(message.note))
                    return "note: string expected";
            if (message.latest != null && $Object.hasOwnProperty.call(message, "latest")) {
                var error = $root.mars.LatestWeather.verify(message.latest, _depth + 1);
                if (error)
                    return "latest." + error;
            }
            if (message.history != null && $Object.hasOwnProperty.call(message, "history")) {
                if (!$Array.isArray(message.history))
                    return "history: array expected";
                for (var i = 0; i < message.history.length; ++i) {
                    var error = $root.mars.WeatherHistory.verify(message.history[i], _depth + 1);
                    if (error)
                        return "history." + error;
                }
            }
            return null;
        };

        /**
         * Creates a StationData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.StationData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.StationData} StationData
         */
        StationData.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.StationData)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.StationData: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.StationData();
            if (object.station != null)
                if (typeof object.station !== "string" || object.station.length)
                    message.station = $String(object.station);
            if (object.rover != null)
                if (typeof object.rover !== "string" || object.rover.length)
                    message.rover = $String(object.rover);
            if (object.name != null)
                if (typeof object.name !== "string" || object.name.length)
                    message.name = $String(object.name);
            if (object.nameEn != null)
                if (typeof object.nameEn !== "string" || object.nameEn.length)
                    message.nameEn = $String(object.nameEn);
            if (object.status != null)
                if (typeof object.status !== "string" || object.status.length)
                    message.status = $String(object.status);
            if (object.instrument != null)
                if (typeof object.instrument !== "string" || object.instrument.length)
                    message.instrument = $String(object.instrument);
            if (object.location != null)
                if (typeof object.location !== "string" || object.location.length)
                    message.location = $String(object.location);
            if (object.note != null)
                if (typeof object.note !== "string" || object.note.length)
                    message.note = $String(object.note);
            if (object.latest != null) {
                if (!$util.isObject(object.latest))
                    throw $TypeError(".mars.StationData.latest: object expected");
                message.latest = $root.mars.LatestWeather.fromObject(object.latest, _depth + 1);
            }
            if (object.history) {
                if (!$Array.isArray(object.history))
                    throw $TypeError(".mars.StationData.history: array expected");
                message.history = $Array(object.history.length);
                for (var i = 0; i < object.history.length; ++i) {
                    if (!$util.isObject(object.history[i]))
                        throw $TypeError(".mars.StationData.history: object expected");
                    message.history[i] = $root.mars.WeatherHistory.fromObject(object.history[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a StationData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.StationData
         * @static
         * @param {mars.StationData} message StationData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StationData.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.arrays || options.defaults)
                object.history = [];
            if (options.defaults) {
                object.station = "";
                object.rover = "";
                object.name = "";
                object.nameEn = "";
                object.status = "";
                object.instrument = "";
                object.location = "";
                object.note = "";
                object.latest = null;
            }
            if (message.station != null && $Object.hasOwnProperty.call(message, "station"))
                object.station = message.station;
            if (message.rover != null && $Object.hasOwnProperty.call(message, "rover"))
                object.rover = message.rover;
            if (message.name != null && $Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.nameEn != null && $Object.hasOwnProperty.call(message, "nameEn"))
                object.nameEn = message.nameEn;
            if (message.status != null && $Object.hasOwnProperty.call(message, "status"))
                object.status = message.status;
            if (message.instrument != null && $Object.hasOwnProperty.call(message, "instrument"))
                object.instrument = message.instrument;
            if (message.location != null && $Object.hasOwnProperty.call(message, "location"))
                object.location = message.location;
            if (message.note != null && $Object.hasOwnProperty.call(message, "note"))
                object.note = message.note;
            if (message.latest != null && $Object.hasOwnProperty.call(message, "latest"))
                object.latest = $root.mars.LatestWeather.toObject(message.latest, options, _depth + 1);
            if (message.history && message.history.length) {
                object.history = $Array(message.history.length);
                for (var j = 0; j < message.history.length; ++j)
                    object.history[j] = $root.mars.WeatherHistory.toObject(message.history[j], options, _depth + 1);
            }
            return object;
        };

        /**
         * Converts this StationData to JSON.
         * @function toJSON
         * @memberof mars.StationData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StationData.prototype.toJSON = function() {
            return StationData.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for StationData
         * @function getTypeUrl
         * @memberof mars.StationData
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        StationData.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.StationData";
        };

        return StationData;
    })();

    mars.StationsMap = (function() {

        /**
         * Properties of a StationsMap.
         * @typedef {Object} mars.StationsMap.$Properties
         * @property {mars.StationData.$Properties|null} [perseverance] StationsMap perseverance
         * @property {mars.StationData.$Properties|null} [curiosity] StationsMap curiosity
         * @property {mars.StationData.$Properties|null} [insight] StationsMap insight
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a StationsMap.
         * @memberof mars
         * @interface IStationsMap
         * @augments mars.StationsMap.$Properties
         * @deprecated Use mars.StationsMap.$Properties instead.
         */

        /**
         * Shape of a StationsMap.
         * @typedef {mars.StationsMap.$Properties} mars.StationsMap.$Shape
         */

        /**
         * Constructs a new StationsMap.
         * @memberof mars
         * @classdesc Represents a StationsMap.
         * @constructor
         * @param {mars.StationsMap.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var StationsMap = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * StationsMap perseverance.
         * @member {mars.StationData.$Properties|null|undefined} perseverance
         * @memberof mars.StationsMap
         * @instance
         */
        StationsMap.prototype.perseverance = null;

        /**
         * StationsMap curiosity.
         * @member {mars.StationData.$Properties|null|undefined} curiosity
         * @memberof mars.StationsMap
         * @instance
         */
        StationsMap.prototype.curiosity = null;

        /**
         * StationsMap insight.
         * @member {mars.StationData.$Properties|null|undefined} insight
         * @memberof mars.StationsMap
         * @instance
         */
        StationsMap.prototype.insight = null;

        /**
         * Creates a new StationsMap instance using the specified properties.
         * @function create
         * @memberof mars.StationsMap
         * @static
         * @param {mars.StationsMap.$Properties=} [properties] Properties to set
         * @returns {mars.StationsMap} StationsMap instance
         * @type {{
         *   (properties: mars.StationsMap.$Shape): mars.StationsMap & mars.StationsMap.$Shape;
         *   (properties?: mars.StationsMap.$Properties): mars.StationsMap;
         * }}
         */
        StationsMap.create = function(properties) {
            return new StationsMap(properties);
        };

        /**
         * Encodes the specified StationsMap message. Does not implicitly {@link mars.StationsMap.verify|verify} messages.
         * @function encode
         * @memberof mars.StationsMap
         * @static
         * @param {mars.StationsMap.$Properties} message StationsMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StationsMap.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.perseverance != null && $Object.hasOwnProperty.call(message, "perseverance"))
                $root.mars.StationData.encode(message.perseverance, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.curiosity != null && $Object.hasOwnProperty.call(message, "curiosity"))
                $root.mars.StationData.encode(message.curiosity, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.insight != null && $Object.hasOwnProperty.call(message, "insight"))
                $root.mars.StationData.encode(message.insight, writer.uint32(/* id 3, wireType 2 =*/26).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified StationsMap message, length delimited. Does not implicitly {@link mars.StationsMap.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.StationsMap
         * @static
         * @param {mars.StationsMap.$Properties} message StationsMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StationsMap.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a StationsMap message from the specified reader or buffer.
         * @function decode
         * @memberof mars.StationsMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.StationsMap & mars.StationsMap.$Shape} StationsMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StationsMap.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.StationsMap();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.perseverance = $root.mars.StationData.decode(reader, reader.uint32(), $undefined, _depth + 1, message.perseverance);
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.curiosity = $root.mars.StationData.decode(reader, reader.uint32(), $undefined, _depth + 1, message.curiosity);
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.insight = $root.mars.StationData.decode(reader, reader.uint32(), $undefined, _depth + 1, message.insight);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a StationsMap message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.StationsMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.StationsMap & mars.StationsMap.$Shape} StationsMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StationsMap.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StationsMap message.
         * @function verify
         * @memberof mars.StationsMap
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StationsMap.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.perseverance != null && $Object.hasOwnProperty.call(message, "perseverance")) {
                var error = $root.mars.StationData.verify(message.perseverance, _depth + 1);
                if (error)
                    return "perseverance." + error;
            }
            if (message.curiosity != null && $Object.hasOwnProperty.call(message, "curiosity")) {
                var error = $root.mars.StationData.verify(message.curiosity, _depth + 1);
                if (error)
                    return "curiosity." + error;
            }
            if (message.insight != null && $Object.hasOwnProperty.call(message, "insight")) {
                var error = $root.mars.StationData.verify(message.insight, _depth + 1);
                if (error)
                    return "insight." + error;
            }
            return null;
        };

        /**
         * Creates a StationsMap message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.StationsMap
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.StationsMap} StationsMap
         */
        StationsMap.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.StationsMap)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.StationsMap: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.StationsMap();
            if (object.perseverance != null) {
                if (!$util.isObject(object.perseverance))
                    throw $TypeError(".mars.StationsMap.perseverance: object expected");
                message.perseverance = $root.mars.StationData.fromObject(object.perseverance, _depth + 1);
            }
            if (object.curiosity != null) {
                if (!$util.isObject(object.curiosity))
                    throw $TypeError(".mars.StationsMap.curiosity: object expected");
                message.curiosity = $root.mars.StationData.fromObject(object.curiosity, _depth + 1);
            }
            if (object.insight != null) {
                if (!$util.isObject(object.insight))
                    throw $TypeError(".mars.StationsMap.insight: object expected");
                message.insight = $root.mars.StationData.fromObject(object.insight, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a StationsMap message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.StationsMap
         * @static
         * @param {mars.StationsMap} message StationsMap
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StationsMap.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.perseverance = null;
                object.curiosity = null;
                object.insight = null;
            }
            if (message.perseverance != null && $Object.hasOwnProperty.call(message, "perseverance"))
                object.perseverance = $root.mars.StationData.toObject(message.perseverance, options, _depth + 1);
            if (message.curiosity != null && $Object.hasOwnProperty.call(message, "curiosity"))
                object.curiosity = $root.mars.StationData.toObject(message.curiosity, options, _depth + 1);
            if (message.insight != null && $Object.hasOwnProperty.call(message, "insight"))
                object.insight = $root.mars.StationData.toObject(message.insight, options, _depth + 1);
            return object;
        };

        /**
         * Converts this StationsMap to JSON.
         * @function toJSON
         * @memberof mars.StationsMap
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StationsMap.prototype.toJSON = function() {
            return StationsMap.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for StationsMap
         * @function getTypeUrl
         * @memberof mars.StationsMap
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        StationsMap.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.StationsMap";
        };

        return StationsMap;
    })();

    mars.WeatherResponse = (function() {

        /**
         * Properties of a WeatherResponse.
         * @typedef {Object} mars.WeatherResponse.$Properties
         * @property {string|null} [timestamp] WeatherResponse timestamp
         * @property {mars.StationsMap.$Properties|null} [stations] WeatherResponse stations
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a WeatherResponse.
         * @memberof mars
         * @interface IWeatherResponse
         * @augments mars.WeatherResponse.$Properties
         * @deprecated Use mars.WeatherResponse.$Properties instead.
         */

        /**
         * Shape of a WeatherResponse.
         * @typedef {mars.WeatherResponse.$Properties} mars.WeatherResponse.$Shape
         */

        /**
         * Constructs a new WeatherResponse.
         * @memberof mars
         * @classdesc Represents a WeatherResponse.
         * @constructor
         * @param {mars.WeatherResponse.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        var WeatherResponse = function (properties) {
            if (properties)
                for (var keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * WeatherResponse timestamp.
         * @member {string} timestamp
         * @memberof mars.WeatherResponse
         * @instance
         */
        WeatherResponse.prototype.timestamp = "";

        /**
         * WeatherResponse stations.
         * @member {mars.StationsMap.$Properties|null|undefined} stations
         * @memberof mars.WeatherResponse
         * @instance
         */
        WeatherResponse.prototype.stations = null;

        /**
         * Creates a new WeatherResponse instance using the specified properties.
         * @function create
         * @memberof mars.WeatherResponse
         * @static
         * @param {mars.WeatherResponse.$Properties=} [properties] Properties to set
         * @returns {mars.WeatherResponse} WeatherResponse instance
         * @type {{
         *   (properties: mars.WeatherResponse.$Shape): mars.WeatherResponse & mars.WeatherResponse.$Shape;
         *   (properties?: mars.WeatherResponse.$Properties): mars.WeatherResponse;
         * }}
         */
        WeatherResponse.create = function(properties) {
            return new WeatherResponse(properties);
        };

        /**
         * Encodes the specified WeatherResponse message. Does not implicitly {@link mars.WeatherResponse.verify|verify} messages.
         * @function encode
         * @memberof mars.WeatherResponse
         * @static
         * @param {mars.WeatherResponse.$Properties} message WeatherResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WeatherResponse.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp") && message.timestamp !== "")
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.timestamp);
            if (message.stations != null && $Object.hasOwnProperty.call(message, "stations"))
                $root.mars.StationsMap.encode(message.stations, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (var i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified WeatherResponse message, length delimited. Does not implicitly {@link mars.WeatherResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof mars.WeatherResponse
         * @static
         * @param {mars.WeatherResponse.$Properties} message WeatherResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WeatherResponse.encodeDelimited = function(message, writer) {
            return this.encode(message, (writer || $Writer.create()).fork()).ldelim();
        };

        /**
         * Decodes a WeatherResponse message from the specified reader or buffer.
         * @function decode
         * @memberof mars.WeatherResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {mars.WeatherResponse & mars.WeatherResponse.$Shape} WeatherResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WeatherResponse.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            var end, message, value;
            if (length === $undefined)
                end = reader.len;
            else {
                end = reader.pos + length;
                if (end > reader.len)
                    throw $RangeError("index out of range");
                length = reader.len;
                reader.len = end;
            }
            message = _target || new $root.mars.WeatherResponse();
            while (reader.pos < end) {
                var start = reader.pos;
                var tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                var wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.timestamp = value;
                        else
                            delete message.timestamp;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.stations = $root.mars.StationsMap.decode(reader, reader.uint32(), $undefined, _depth + 1, message.stations);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (length !== $undefined) {
                if (reader.pos !== end)
                    throw $RangeError("index out of range");
                reader.len = length;
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a WeatherResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof mars.WeatherResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {mars.WeatherResponse & mars.WeatherResponse.$Shape} WeatherResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WeatherResponse.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WeatherResponse message.
         * @function verify
         * @memberof mars.WeatherResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WeatherResponse.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp"))
                if (!$util.isString(message.timestamp))
                    return "timestamp: string expected";
            if (message.stations != null && $Object.hasOwnProperty.call(message, "stations")) {
                var error = $root.mars.StationsMap.verify(message.stations, _depth + 1);
                if (error)
                    return "stations." + error;
            }
            return null;
        };

        /**
         * Creates a WeatherResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof mars.WeatherResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {mars.WeatherResponse} WeatherResponse
         */
        WeatherResponse.fromObject = function (object, _depth) {
            if (object instanceof $root.mars.WeatherResponse)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".mars.WeatherResponse: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var message = new $root.mars.WeatherResponse();
            if (object.timestamp != null)
                if (typeof object.timestamp !== "string" || object.timestamp.length)
                    message.timestamp = $String(object.timestamp);
            if (object.stations != null) {
                if (!$util.isObject(object.stations))
                    throw $TypeError(".mars.WeatherResponse.stations: object expected");
                message.stations = $root.mars.StationsMap.fromObject(object.stations, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a WeatherResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof mars.WeatherResponse
         * @static
         * @param {mars.WeatherResponse} message WeatherResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WeatherResponse.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            var object = {};
            if (options.defaults) {
                object.timestamp = "";
                object.stations = null;
            }
            if (message.timestamp != null && $Object.hasOwnProperty.call(message, "timestamp"))
                object.timestamp = message.timestamp;
            if (message.stations != null && $Object.hasOwnProperty.call(message, "stations"))
                object.stations = $root.mars.StationsMap.toObject(message.stations, options, _depth + 1);
            return object;
        };

        /**
         * Converts this WeatherResponse to JSON.
         * @function toJSON
         * @memberof mars.WeatherResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WeatherResponse.prototype.toJSON = function() {
            return WeatherResponse.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for WeatherResponse
         * @function getTypeUrl
         * @memberof mars.WeatherResponse
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        WeatherResponse.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/mars.WeatherResponse";
        };

        return WeatherResponse;
    })();

    return mars;
})();

module.exports = $root;
